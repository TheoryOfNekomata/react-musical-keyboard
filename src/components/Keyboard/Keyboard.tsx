import * as React from 'react'
import * as PropTypes from 'prop-types'
import isNaturalKeyUnmemoized from '../../services/isNaturalKey'
import getKeyWidthUnmemoized from '../../services/getKeyWidth'
import getKeyLeftUnmemoized from '../../services/getKeyLeft'
import generateKeys from '../../services/generateKeys'
import DefaultAccidentalKey from '../AccidentalKey/AccidentalKey'
import DefaultNaturalKey from '../NaturalKey/NaturalKey'
import KeyboardMap from '../KeyboardMap/KeyboardMap'
import getKeyBounds from '../../services/getKeyBounds'
import { BEHAVIORS, OCTAVE_DIVISIONS, ORIENTATIONS, COMPONENTS } from '../../services/constants'

const propTypes = {
  /**
   * MIDI note of the first key.
   */
  startKey: PropTypes.number.isRequired,

  /**
   * MIDI note of the last key.
   */
  endKey: PropTypes.number.isRequired,

  /**
   * Equal parts of an octave.
   */
  octaveDivision: PropTypes.oneOf(OCTAVE_DIVISIONS),

  /**
   * Ratio of the length of the accidental keys to the natural keys.
   */
  accidentalKeyLengthRatio: PropTypes.number,

  /**
   * Current active keys and their channel assignments.
   */
  keysOn: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.number.isRequired,
      velocity: PropTypes.number.isRequired,
    }),
  ),

  /**
   * Components to use for each kind of key.
   */
  keyComponents: PropTypes.shape({
    natural: PropTypes.elementType,
    accidental: PropTypes.elementType,
  }),

  /**
   * Width of the component.
   */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Height of the component.
   */
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * Event handler triggered upon change in activated keys in the component.
   */
  onChange: PropTypes.func,

  /**
   * Map from key code to key number, used to activate the component from the keyboard.
   */
  keyboardMapping: PropTypes.object,

  /**
   * Behavior of the component when clicking.
   */
  fallbackBehavior: PropTypes.oneOf(BEHAVIORS),

  /**
   * Name of the component used for forms.
   */
  name: PropTypes.string,

  /**
   * Destination of the component upon clicking a key, if fallbackBehavior is set to 'link'.
   */
  href: PropTypes.func,

  /**
   * MIDI input for sending MIDI messages to the component.
   */
  midiInput: PropTypes.shape({
    addEventListener: PropTypes.func.isRequired,
    removeEventListener: PropTypes.func.isRequired,
  }),

  /**
   * Received velocity when activating the component through the keyboard.
   */
  keyboardVelocity: PropTypes.number,

  /**
   * Orientation of the component.
   */
  orientation: PropTypes.oneOf(ORIENTATIONS),

  /**
   * Is the component mirrored?
   */
  mirrored: PropTypes.bool,

  /**
   * Function returning the label of each key.
   */
  keyLabels: PropTypes.func,
}

export type Props = PropTypes.InferProps<typeof propTypes>

/**
 * Component for displaying musical notes in the form of a piano keyboard.
 */
const Keyboard: React.FC<Props> = ({
  startKey,
  endKey,
  octaveDivision = 12,
  accidentalKeyLengthRatio = 0.65,
  keysOn = [],
  width = '100%',
  keyComponents = {},
  height = 80,
  onChange,
  keyboardMapping,
  fallbackBehavior,
  name,
  href,
  midiInput,
  keyboardVelocity,
  orientation = 0,
  mirrored = false,
  keyLabels,
}) => {
  const [clientSide, setClientSide] = React.useState(false)
  const [clientSideKeys, setClientSideKeys] = React.useState<number[]>([])

  const { natural: NaturalKey = DefaultNaturalKey, accidental: AccidentalKey = DefaultAccidentalKey } = keyComponents!

  const getKeyWidth = React.useCallback((k) => getKeyWidthUnmemoized(startKey, endKey)(k), [startKey, endKey])
  const getKeyLeft = React.useCallback((k) => getKeyLeftUnmemoized(startKey, endKey)(k), [startKey, endKey])
  const isNaturalKey = React.useCallback((k) => isNaturalKeyUnmemoized(k), [])
  const baseRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    setClientSide(true)
  }, [])

  React.useEffect(() => {
    setClientSideKeys(generateKeys(startKey!, endKey!))
  }, [startKey, endKey])

  const keys = clientSide ? clientSideKeys : generateKeys(startKey, endKey)
  const widthDimension = orientation === 90 || orientation === 270 ? 'height' : 'width'
  const heightDimension = orientation === 90 || orientation === 270 ? 'width' : 'height'
  let leftDirection: string
  let topDirection: string

  switch (orientation) {
    default:
    case 0:
      leftDirection = 'left'
      topDirection = 'top'
      break
    case 90:
      leftDirection = 'bottom'
      topDirection = 'left'
      break
    case 180:
      leftDirection = 'right'
      topDirection = 'bottom'
      break
    case 270:
      leftDirection = 'top'
      topDirection = 'right'
      break
  }

  return (
    <React.Fragment>
      <style>{`
        .ReactMusicalKeyboard-checkbox:checked + * {
          --opacity-highlight: 1,
        }
      `}</style>
      <div
        style={{
          width: width!,
          height: height!,
          position: 'relative',
          backgroundColor: 'currentColor',
          overflow: 'hidden',
        }}
        role="presentation"
        ref={baseRef}
      >
        {keys.map((key) => {
          const isNatural = isNaturalKey(key)
          const Component: any = isNatural ? NaturalKey! : AccidentalKey!
          const [currentKey = null] = Array.isArray(keysOn!) ? keysOn.filter((kc) => kc!.key === key) : []
          const width = getKeyWidth(key)
          const left = getKeyLeft(key)
          const { left: leftBounds, right: rightBounds } = getKeyBounds(
            startKey,
            endKey,
            getKeyLeft,
            getKeyWidth,
          )(key, left, width)
          const octaveStart = Math.floor(key / 12) * 12
          // TODO implement xenharmonic keyboards
          const theOctaveDivision = (octaveDivision as number) !== 12 ? 12 : octaveDivision
          const octaveEnd = octaveStart + 12 * (1 - 1 / theOctaveDivision!)
          const octaveLeftBounds = getKeyLeft(octaveStart)
          const octaveRightBounds = getKeyLeft(octaveEnd) + getKeyWidth(octaveEnd)

          const { [fallbackBehavior!]: component = 'div' } = COMPONENTS

          const KeyComponent = component as React.ElementType

          return (
            <KeyComponent
              key={key}
              href={fallbackBehavior === 'link' ? href!(key) : undefined}
              data-key={key}
              data-octave-left-bounds={octaveLeftBounds}
              data-octave-right-bounds={octaveRightBounds}
              data-left-bounds={leftBounds}
              data-right-bounds={rightBounds}
              data-left-full-bounds={isNatural ? left : undefined}
              data-right-full-bounds={isNatural ? left + width : undefined}
              style={{
                zIndex: isNatural ? 0 : 2,
                [widthDimension]: width + '%',
                [heightDimension]: (isNatural ? 100 : 100 * accidentalKeyLengthRatio!) + '%',
                [leftDirection]: (mirrored ? 100 - width - left : left) + '%',
                position: 'absolute',
                [topDirection]: 0,
                cursor: onChange || fallbackBehavior ? 'pointer' : undefined,
                color: 'inherit',
                '--opacity-highlight': currentKey !== null ? 1 : 0,
              }}
            >
              {(fallbackBehavior! === 'checkbox' || fallbackBehavior === 'radio') && (
                <input
                  type={fallbackBehavior}
                  className="ReactMusicalKeyboard-checkbox"
                  name={name!}
                  value={key}
                  defaultChecked={currentKey !== null}
                  style={{
                    position: 'absolute',
                    left: -999999,
                    width: 1,
                    height: 1,
                  }}
                />
              )}
              <Component
                label={typeof keyLabels! === 'function' ? keyLabels(key) : null}
                orientation={orientation}
                mirrored={mirrored}
              />
            </KeyComponent>
          )
        })}
        {clientSide && (
          <KeyboardMap
            accidentalKeyLengthRatio={accidentalKeyLengthRatio}
            onChange={onChange}
            keyboardMapping={keyboardMapping}
            midiInput={midiInput}
            keyboardVelocity={keyboardVelocity}
            orientation={orientation}
            mirrored={mirrored}
          />
        )}
      </div>
    </React.Fragment>
  )
}

Keyboard.propTypes = propTypes

export default Keyboard
