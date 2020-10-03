import * as React from 'react'
import * as PropTypes from 'prop-types'
import isNaturalKeyUnmemoized from '../../services/isNaturalKey'
import getKeyWidthUnmemoized from '../../services/getKeyWidth'
import getKeyLeftUnmemoized from '../../services/getKeyLeft'
import generateKeys from '../../services/generateKeys'
import DefaultAccidentalKey from '../AccidentalKey/AccidentalKey'
import DefaultNaturalKey from '../NaturalKey/NaturalKey'

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
      channel: PropTypes.number.isRequired,
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
  children,
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
        const currentKeyChannels = Array.isArray(keyChannels!) ? keyChannels.filter((kc) => kc!.key === key) : null

        const width = getKeyWidth(key)
        const left = getKeyLeft(key)

        let leftBounds: number
        let rightBounds: number

        switch (key % 12) {
          case 0:
          case 5:
            leftBounds = left
            rightBounds = key + 1 > endKey! ? left + width : getKeyLeft(key + 1)
            break
          case 4:
          case 11:
            leftBounds = key - 1 < startKey! ? left : getKeyLeft(key - 1) + getKeyWidth(key - 1)
            rightBounds = left + width
            break
          case 2:
          case 7:
          case 9:
            leftBounds = key - 1 < startKey! ? left : getKeyLeft(key - 1) + getKeyWidth(key - 1)
            rightBounds = key + 1 > endKey! ? left + width : getKeyLeft(key + 1)
            break
          default:
            leftBounds = left
            rightBounds = left + width
            break
        }

        const octaveStart = Math.floor(key / 12) * 12
        const octaveEnd = octaveStart + 11
        const octaveLeftBounds = getKeyLeft(octaveStart)
        const octaveRightBounds = getKeyLeft(octaveEnd) + getKeyWidth(octaveEnd)

        return (
          <div
            key={key}
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
            }}
          >
            <Component keyChannels={currentKeyChannels} />
          </div>
        )
      })}
      {children! &&
        React.Children.map(children, (unknownChild) => {
          const child = unknownChild as React.ReactElement
          const { props = {} } = child
          return React.cloneElement(child, {
            ...props,
            accidentalKeyLengthRatio,
          })
        })}
    </div>
  )
}

Keyboard.propTypes = propTypes

export default Keyboard
