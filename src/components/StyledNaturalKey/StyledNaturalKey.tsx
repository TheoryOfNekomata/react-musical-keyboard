import * as React from 'react'
import * as PropTypes from 'prop-types'
import styled from 'styled-components'
import keyPropTypes from '../../services/keyPropTypes'

const DEFAULT_COLOR = '#e3e3e5'
const LIGHT_COLOR = 'white'

const Base = styled('div')({
  width: '100%',
  height: '100%',
  position: 'relative',
})

const N1 = styled('div')({
  width: '100%',
  height: '100%',
  position: 'relative',
})

const N2 = styled('div')({
  width: '100%',
  height: '100%',
  backgroundColor: 'black',
  position: 'absolute',
  top: '0',
  left: '0',
})

const N3 = styled('div')({
  width: '100%',
  height: '100%',
  padding:
    'calc(1px * var(--size-scale-factor, 1)) 0 calc(1px * var(--size-scale-factor, 1)) calc(1px * var(--size-scale-factor, 1))',
  boxSizing: 'border-box',
  position: 'absolute',
  top: '0',
  left: '0',
})

const N4 = styled('div')({
  width: '100%',
  height: '100%',
  backgroundColor: `var(--color-natural-key, ${DEFAULT_COLOR})`,
  borderRadius: '0 0 calc(1px * var(--size-scale-factor, 1)) calc(1px * var(--size-scale-factor, 1))',
})

const N5 = styled('div')({
  width: '100%',
  height: 'calc(33 / 80 * 100%)',
  padding:
    '0 calc(1px * var(--size-scale-factor, 1)) calc(2px * var(--size-scale-factor, 1)) calc(2px * var(--size-scale-factor, 1))',
  boxSizing: 'border-box',
  backgroundClip: 'content-box',
  position: 'absolute',
  bottom: '0',
  left: '0',
  opacity: '0.25',
  maskImage: 'linear-gradient(to bottom, transparent, white)',
})

const N6 = styled('div')({
  width: '100%',
  height: '100%',
  backgroundColor: 'black',
  padding:
    'calc(1px * var(--size-scale-factor, 1)) calc(2px * var(--size-scale-factor, 1)) calc(3px * var(--size-scale-factor, 1)) calc(3px * var(--size-scale-factor, 1))',
  boxSizing: 'border-box',
  backgroundClip: 'content-box',
  position: 'absolute',
  bottom: '0',
  left: '0',
  opacity: '0.08',
  maskImage: 'linear-gradient(to bottom, transparent, white)',
})

const N7 = styled('div')({
  width: '100%',
  height: 'calc(2px * var(--size-scale-factor, 1))',
  padding: '0 0 calc(1px * var(--size-scale-factor, 1)) calc(1px * var(--size-scale-factor, 1))',
  boxSizing: 'border-box',
  position: 'absolute',
  bottom: '0',
  left: '0',
})

const N8 = styled('div')({
  width: '100%',
  height: '100%',
  backgroundColor: 'black',
  borderRadius: '0 0 calc(1px * var(--size-scale-factor, 1)) calc(1px * var(--size-scale-factor, 1))',
  opacity: '0.25',
})
const N9 = styled('div')({
  width: 'calc(2px * var(--size-scale-factor, 1))',
  height: '100%',
  padding:
    'calc(1px * var(--size-scale-factor, 1)) 0 calc(1px * var(--size-scale-factor, 1)) calc(1px * var(--size-scale-factor, 1))',
  boxSizing: 'border-box',
  position: 'absolute',
  bottom: '0',
  left: '0',
})
const N10 = styled('div')({
  width: '100%',
  height: '100%',
  backgroundColor: 'black',
  borderRadius: '0 0 0 calc(1px * var(--size-scale-factor, 1))',
  opacity: '0.07',
})
const N11 = styled('div')({
  width: '100%',
  height: 'calc(6px * var(--size-scale-factor, 1))',
  padding: 'calc(1px * var(--size-scale-factor, 1)) 0 0 calc(1px * var(--size-scale-factor, 1))',
  boxSizing: 'border-box',
  position: 'absolute',
  top: '0',
  left: '0',
})
const N12 = styled('div')({
  width: '100%',
  height: '100%',
  backgroundColor: 'black',
  maskImage: 'linear-gradient(to bottom, white, transparent)',
  opacity: '0.12',
})
const N13 = styled('div')({
  width: '100%',
  padding: 'calc(1px * var(--size-scale-factor, 1)) 0 0 calc(1px * var(--size-scale-factor, 1))',
  boxSizing: 'border-box',
  position: 'absolute',
  top: '0',
  left: '0',
})
const N14 = styled('div')({
  width: '100%',
  height: '100%',
  backgroundColor: 'black',
  opacity: '0.12',
})
const N15 = styled('div')({
  width: 'calc(1px * var(--size-scale-factor, 1))',
  height: '100%',
  padding: 'calc(1px * var(--size-scale-factor, 1)) 0 calc(1px * var(--size-scale-factor, 1)) 0',
  boxSizing: 'border-box',
  position: 'absolute',
  bottom: '0',
  right: '0',
})
const N16 = styled('div')({
  width: '100%',
  height: '100%',
  backgroundColor: LIGHT_COLOR,
  borderRadius: '0 0 calc(1px * var(--size-scale-factor, 1)) 0',
  opacity: '0.12',
})

type Props = PropTypes.InferProps<typeof keyPropTypes>

const StyledNaturalKey: React.FC<Props> = ({ keyChannels }) => {
  const hasKeyChannels = Array.isArray(keyChannels!) && keyChannels.length > 0
  return (
    <Base
      style={{
        // @ts-ignore
        '--color-natural-key': hasKeyChannels ? `var(--color-channel-${keyChannels![0]!.channel})` : undefined,
      }}
    >
      <N1>
        <N2 />
        <N3>
          <N4
            style={{
              opacity: hasKeyChannels ? 0.75 : 1,
            }}
          />
        </N3>
        <N5
          style={{
            backgroundColor: hasKeyChannels ? 'black' : LIGHT_COLOR,
            opacity: hasKeyChannels ? 0.12 : 0.25,
          }}
        />
        <N6 />
        <N7>
          <N8 />
        </N7>
        <N9>
          <N10 />
        </N9>
        <N11>
          <N12 />
        </N11>
        <N13
          style={{
            height: hasKeyChannels
              ? 'calc(4px * var(--size-scale-factor, 1))'
              : 'calc(3px * var(--size-scale-factor, 1))',
          }}
        >
          <N14 />
        </N13>
        <N15>
          <N16 />
        </N15>
      </N1>
    </Base>
  )
}

StyledNaturalKey.propTypes = keyPropTypes

export default StyledNaturalKey
