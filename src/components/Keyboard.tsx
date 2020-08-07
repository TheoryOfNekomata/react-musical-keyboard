import * as React from 'react'
import * as PropTypes from 'prop-types'
import styled from 'styled-components'
import isNaturalKey from '../services/isNaturalKey'
import getKeyWidth from '../services/getKeyWidth'
import getKeyLeft from '../services/getKeyLeft'
import generateKeys from '../services/generateKeys'

const Base = styled('div')({
  position: 'relative',
})

const Key = styled('div')({
  position: 'absolute',
  top: 0,
})

const DefaultNaturalKey = styled('div')({
  width: '100%',
  height: '100%',
  backgroundColor: 'white',
  border: '1px solid',
  boxSizing: 'border-box',
  position: 'relative',
})

const DefaultAccidentalKey = styled('div')({
  width: '100%',
  height: '100%',
  backgroundColor: 'black',
  border: '1px solid',
  boxSizing: 'border-box',
  position: 'relative',
})

const Highlight = styled('div')({
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  opacity: 0.75,
})

export const propTypes = {
  startKey: PropTypes.number.isRequired,

  endKey: PropTypes.number.isRequired,

  //octaveDivision: PropTypes.number,

  accidentalKeyLengthRatio: PropTypes.number,

  keyChannels: PropTypes.arrayOf(PropTypes.shape({
    channel: PropTypes.number.isRequired,
    key: PropTypes.number.isRequired,
    velocity: PropTypes.number.isRequired,
  })),

  channelColors: PropTypes.arrayOf(PropTypes.string),

  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

const DEFAULT_CHANNEL_COLORS = [
  '#ff5555',
  '#ffff00',
  '#00aa00',
  '#0055aa',
  '#aa00ff',
  '#aa0000',
  '#aa5500',
  '#ffaa00',
  '#00ff00',
  '#00aaaa',
  '#00ffff',
  '#ff00aa',
  '#aaaa00',
  '#555500',
  '#5500aa',
  '#ff55ff',
]

type Props = PropTypes.InferProps<typeof propTypes>

const Keyboard: React.FC<Props> = ({
  startKey,
  endKey,
  //octaveDivision = 12,
  accidentalKeyLengthRatio = 0.65,
  keyChannels = [],
  channelColors = DEFAULT_CHANNEL_COLORS,
  width = '100%',
  keyComponents: {
    natural: NaturalKey = DefaultNaturalKey,
    accidental: AccidentalKey = DefaultAccidentalKey,
  } = {},
  height = 80,
}) => {
  const [keys, setKeys, ] = React.useState<number[]>([])

  React.useEffect(() => {
    setKeys(generateKeys(startKey!, endKey!))
  }, [startKey, endKey, ])

  return (
    <Base
      style={{
        width: width!,
        height: height!,
        backgroundColor: 'black',
        overflow: 'hidden',
      }}
    >
      {keys.map(k => {
        const isNatural = isNaturalKey(k)
        const Component = isNatural ? NaturalKey : AccidentalKey
        const width = getKeyWidth(startKey!, endKey!)(k)
        const height = isNatural ? 100 : 100 * accidentalKeyLengthRatio!
        const left = getKeyLeft(startKey!, endKey!)(k)
        const currentKeyChannels = (
          Array.isArray(keyChannels!)
            ? keyChannels.filter(kc => kc!.key === k)
            : null
        )

        return (
          <Key
            style={{
              zIndex: isNatural ? 0 : 2,
              width: width + '%',
              height: height + '%',
              left: left + '%',
            }}
          >
            <Component>
              {
                Array.isArray(currentKeyChannels)
                && currentKeyChannels.map(c => (
                  <Highlight
                    key={c!.channel}
                    style={{
                      backgroundColor: channelColors![c!.channel] as string,
                    }}
                  />
                ))
              }
            </Component>
          </Key>
        )
      })}
    </Base>
  )
}

Keyboard.propTypes = propTypes

export default Keyboard
