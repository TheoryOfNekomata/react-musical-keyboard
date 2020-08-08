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
 * @param accidentalKeyLengthRatio - Ratio of the length of the accidental keys to the natural keys.
 * @param keyChannels - Current active keys and their channel assignments.
 * @param width - Width of the component.
 * @param keyComponents - Components to use for each kind of key.
 * @param height - Height of the component.
 * @constructor
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
}) => {
  const [keys, setKeys] = React.useState<number[]>([])

  const { natural: NaturalKey = DefaultNaturalKey, accidental: AccidentalKey = DefaultAccidentalKey } = keyComponents!

  const getKeyWidth = React.useCallback((k) => getKeyWidthUnmemoized(startKey, endKey)(k), [startKey, endKey, width])
  const getKeyLeft = React.useCallback((k) => getKeyLeftUnmemoized(startKey, endKey)(k), [startKey, endKey, width])
  const isNaturalKey = React.useCallback((k) => isNaturalKeyUnmemoized(k), [])

  React.useEffect(() => {
    setKeys(generateKeys(startKey!, endKey!))
  }, [startKey, endKey])

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
    >
      {keys.map((key) => {
        const isNatural = isNaturalKey(key)
        const Component: any = isNatural ? NaturalKey! : AccidentalKey!
        const currentKeyChannels = Array.isArray(keyChannels!) ? keyChannels.filter((kc) => kc!.key === key) : null

        return (
          <div
            key={key}
            style={{
              zIndex: isNatural ? 0 : 2,
              width: getKeyWidth(key) + '%',
              height: (isNatural ? 100 : 100 * accidentalKeyLengthRatio!) + '%',
              left: getKeyLeft(key) + '%',
              position: 'absolute',
              top: 0,
            }}
          >
            <Component keyChannels={currentKeyChannels} />
          </div>
        )
      })}
    </div>
  )
}

Keyboard.propTypes = propTypes

export default Keyboard
