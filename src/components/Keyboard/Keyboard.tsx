import * as React from 'react'
import * as PropTypes from 'prop-types'
import styled from 'styled-components'
import isNaturalKey from '../../services/isNaturalKey'
import getKeyWidth from '../../services/getKeyWidth'
import getKeyLeft from '../../services/getKeyLeft'
import generateKeys from '../../services/generateKeys'
import * as DefaultAccidentalKey from '../AccidentalKey/AccidentalKey'
import * as DefaultNaturalKey from '../NaturalKey/NaturalKey'

const Base = styled('div')({
  position: 'relative',
  backgroundColor: 'currentColor',
  overflow: 'hidden',
})

const Key = styled('div')({
  position: 'absolute',
  top: 0,
})

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

  React.useEffect(() => {
    setKeys(generateKeys(startKey!, endKey!))
  }, [startKey, endKey])

  const {
    natural: NaturalKey = DefaultNaturalKey.default,
    accidental: AccidentalKey = DefaultAccidentalKey.default,
  } = keyComponents!

  return (
    <Base
      style={{
        width: width!,
        height: height!,
      }}
    >
      {keys.map((k) => {
        const isNatural = isNaturalKey(k)
        const Component: any = isNatural ? NaturalKey! : AccidentalKey!

        const width = getKeyWidth(startKey!, endKey!)(k)
        const height = isNatural ? 100 : 100 * accidentalKeyLengthRatio!
        const left = getKeyLeft(startKey!, endKey!)(k)
        const currentKeyChannels = Array.isArray(keyChannels!) ? keyChannels.filter((kc) => kc!.key === k) : null

        return (
          <Key
            key={k}
            style={{
              zIndex: isNatural ? 0 : 2,
              width: width + '%',
              height: height + '%',
              left: left + '%',
            }}
          >
            <Component keyChannels={currentKeyChannels} />
          </Key>
        )
      })}
    </Base>
  )
}

Keyboard.propTypes = propTypes

export default Keyboard
