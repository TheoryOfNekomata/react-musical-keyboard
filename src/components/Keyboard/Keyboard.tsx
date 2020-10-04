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

const BEHAVIOR = ['link', 'checkbox', 'radio'] as const

export const propTypes = {
  /**
   * MIDI note of the first key.
   */
  startKey: PropTypes.number.isRequired,

  /**
   * MIDI note of the last key.
   */
  endKey: PropTypes.number.isRequired,

  /**
   * Does the component have a clickable map?
   */
  hasMap: PropTypes.bool,

  //octaveDivision: PropTypes.number,

  /**
   * Ratio of the length of the accidental keys to the natural keys.
   */
  accidentalKeyLengthRatio: PropTypes.number,

  /**
   * Current active keys and their channel assignments.
   */
  keyChannels: PropTypes.arrayOf(
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
   * Map from key code to key number.
   */
  keyboardMapping: PropTypes.object,
  /**
   * Behavior of the component when clicking.
   */
  behavior: PropTypes.oneOf(BEHAVIOR),
  /**
   * Name of the component used for forms.
   */
  name: PropTypes.string,
  /**
   * Destination of the component upon clicking a key, if behavior is set to 'link'.
   */
  href: PropTypes.func,
}

type Props = PropTypes.InferProps<typeof propTypes>

/**
 * Component for displaying musical notes in the form of a piano keyboard.
 * @param startKey - MIDI note of the first key.
 * @param endKey - MIDI note of the last key.
 * @param hasMap - The component's clickable map component.
 * @param accidentalKeyLengthRatio - Ratio of the length of the accidental keys to the natural keys.
 * @param keyChannels - Current active keys and their channel assignments.
 * @param width - Width of the component.
 * @param keyComponents - Components to use for each kind of key.
 * @param height - Height of the component.
 * @param name - Name of the component used for forms.
 * @param href - Destination of the component upon clicking a key, if behavior is set to 'link'.
 * @param behavior - Behavior of the component when clicking.
 */
const Keyboard: React.FC<Props> = ({
  startKey,
  endKey,
  //octaveDivision = 12,
  accidentalKeyLengthRatio = 0.65,
  keyChannels = [],
  width = '100%',
  keyComponents = {},
  height = 80,
  onChange,
  keyboardMapping,
  behavior,
  name,
  href,
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
          const [currentKey = null] = Array.isArray(keyChannels!) ? keyChannels.filter((kc) => kc!.key === key) : []
          const width = getKeyWidth(key)
          const left = getKeyLeft(key)
          const { left: leftBounds, right: rightBounds } = getKeyBounds(
            startKey,
            endKey,
            getKeyLeft,
            getKeyWidth,
          )(key, left, width)
          const octaveStart = Math.floor(key / 12) * 12
          const octaveEnd = octaveStart + 11
          const octaveLeftBounds = getKeyLeft(octaveStart)
          const octaveRightBounds = getKeyLeft(octaveEnd) + getKeyWidth(octaveEnd)
          const components: Record<string, string> = {
            link: 'a',
            checkbox: 'label',
            radio: 'label',
          }

          const { [behavior!]: component = 'div' } = components

          const KeyComponent = component as React.ElementType

          return (
            <KeyComponent
              key={key}
              href={behavior === 'link' ? href!(key) : undefined}
              data-key={key}
              data-octave-left-bounds={octaveLeftBounds}
              data-octave-right-bounds={octaveRightBounds}
              data-left-bounds={leftBounds}
              data-right-bounds={rightBounds}
              data-left-full-bounds={isNatural ? left : undefined}
              data-right-full-bounds={isNatural ? left + width : undefined}
              style={{
                zIndex: isNatural ? 0 : 2,
                width: width + '%',
                height: (isNatural ? 100 : 100 * accidentalKeyLengthRatio!) + '%',
                left: left + '%',
                position: 'absolute',
                top: 0,
                cursor: onChange || behavior ? 'pointer' : undefined,
                color: 'inherit',
                '--opacity-highlight': currentKey !== null ? 1 : 0,
              }}
            >
              {(behavior! === 'checkbox' || behavior === 'radio') && (
                <input
                  type={behavior}
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
              <Component />
            </KeyComponent>
          )
        })}
        {clientSide && (
          <KeyboardMap
            accidentalKeyLengthRatio={accidentalKeyLengthRatio}
            onChange={onChange}
            keyboardMapping={keyboardMapping}
          />
        )}
      </div>
    </React.Fragment>
  )
}

Keyboard.propTypes = propTypes

export default Keyboard
