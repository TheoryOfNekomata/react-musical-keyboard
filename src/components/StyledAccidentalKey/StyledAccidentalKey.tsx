import * as React from 'react'
import * as PropTypes from 'prop-types'
import styled from 'styled-components'
import keyPropTypes from '../../services/keyPropTypes'

const DEFAULT_COLOR = '#35313b'
const LIGHT_COLOR = 'white'

const Base = styled('div')({
  width: '100%',
  height: '100%',
  position: 'relative',
})

const B2 = styled('div')({
  width: '100%',
  height: '100%',
  borderRadius: '0 0 calc(1px * var(--size-scale-factor, 1)) calc(1px * var(--size-scale-factor, 1))',
  backgroundColor: `var(--color-accidental-key, ${DEFAULT_COLOR})`,
  maskImage: 'linear-gradient(to bottom, white, rgba(0, 0, 0, 0.9))',
})

const B3 = styled('div')({
  width: '100%',
  height: '100%',
  backgroundColor: `var(--color-accidental-key, ${DEFAULT_COLOR})`,
})

const B4 = styled('div')({
  width: '100%',
  height: 'calc(4px * var(--size-scale-factor, 1))',
  padding: 'calc(1px * var(--size-scale-factor, 1)) 0 0 0',
  boxSizing: 'border-box',
  position: 'absolute',
  top: 0,
  left: 0,
})

const B5 = styled('div')({
  width: '100%',
  height: '100%',
  backgroundColor: 'black',
  opacity: '0.12',
})

const B6 = styled('div')({
  width: 'calc(2px * var(--size-scale-factor, 1))',
  height: 'calc(11px * var(--size-scale-factor, 1))',
  padding:
    'calc(1px * var(--size-scale-factor, 1)) calc(1px * var(--size-scale-factor, 1)) calc(1px * var(--size-scale-factor, 1)) 0',
  boxSizing: 'border-box',
  position: 'absolute',
  top: 0,
  right: 0,
})

const B7 = styled('div')({
  width: '100%',
  height: '100%',
  backgroundColor: LIGHT_COLOR,
  maskImage: 'linear-gradient(to bottom, transparent, white)',
  opacity: '0.4',
})

const B8 = styled('div')({
  width: 'calc(2px * var(--size-scale-factor, 1))',
  height: '100%',
  padding:
    'calc(10px * var(--size-scale-factor, 1)) calc(1px * var(--size-scale-factor, 1)) calc(6px * var(--size-scale-factor, 1)) 0',
  boxSizing: 'border-box',
  position: 'absolute',
  top: 0,
  right: 0,
})

const B9 = styled('div')({
  width: '100%',
  height: '100%',
  backgroundColor: LIGHT_COLOR,
  opacity: '0.4',
  borderBottomRightRadius: 'calc(1px * var(--size-scale-factor, 1))',
})

const B10 = styled('div')({
  width: '100%',
  padding:
    '0 calc(1px * var(--size-scale-factor, 1)) calc(1px * var(--size-scale-factor, 1)) calc(1px * var(--size-scale-factor, 1))',
  boxSizing: 'border-box',
  position: 'absolute',
  bottom: 0,
  left: 0,
})

const B11 = styled('div')({
  width: '100%',
  height: '100%',
  backgroundColor: LIGHT_COLOR,
  borderRadius:
    'calc(4px * var(--size-scale-factor, 1)) calc(4px * var(--size-scale-factor, 1)) calc(1px * var(--size-scale-factor, 1)) calc(1px * var(--size-scale-factor, 1))',
  opacity: '0.12',
})

const B12 = styled('div')({
  width: '100%',
  height: '100%',
  padding:
    'calc(3px * var(--size-scale-factor, 1)) calc(3px * var(--size-scale-factor, 1)) calc(7px * var(--size-scale-factor, 1)) calc(3px * var(--size-scale-factor, 1))',
  boxSizing: 'border-box',
  position: 'absolute',
  top: 0,
  left: 0,
})

const B13 = styled('div')({
  width: '100%',
  height: '100%',
  backgroundColor: LIGHT_COLOR,
  maskImage: 'linear-gradient(to bottom, transparent, white)',
  borderRadius: 99999,
})

const B14 = styled('div')({
  width: '100%',
  height: 'calc(6px * var(--size-scale-factor, 1))',
  padding:
    '0 calc(1px * var(--size-scale-factor, 1)) calc(5px * var(--size-scale-factor, 1)) calc(2px * var(--size-scale-factor, 1))',
  boxSizing: 'border-box',
  position: 'absolute',
  bottom: 0,
  left: 0,
})

const B15 = styled('div')({
  width: '100%',
  height: '100%',
  backgroundColor: LIGHT_COLOR,
  borderRadius: '0 0 calc(1px * var(--size-scale-factor, 1)) calc(1px * var(--size-scale-factor, 1))',
  opacity: '0.4',
})

const B16 = styled('div')({
  width: '100%',
  height: '100%',
  backgroundColor: 'black',
  position: 'absolute',
  top: 0,
  left: 0,
  borderRadius: '0 0 calc(1px * var(--size-scale-factor, 1)) calc(1px * var(--size-scale-factor, 1))',
})

const B17 = styled('div')({
  width: '100%',
  height: 'calc(6 / 50 * 100%)',
  padding: '0 calc(1px * var(--size-scale-factor, 1)) calc(1px * var(--size-scale-factor, 1))',
  boxSizing: 'border-box',
  position: 'absolute',
  bottom: 0,
  left: 0,
})

const B18 = styled('div')({
  width: '100%',
  height: 'calc(44 / 50 * 100%)',
  padding: 'calc(1px * var(--size-scale-factor, 1)) calc(1px * var(--size-scale-factor, 1)) 0',
  boxSizing: 'border-box',
  position: 'absolute',
  top: 0,
  left: 0,
})

const B19 = styled('div')({
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  borderRadius: 'calc(1px * var(--size-scale-factor, 1))',
  boxShadow: '0 0 0 calc(1px * var(--size-scale-factor, 1)) rgba(0, 0, 0, 0.25)',
})

type Props = PropTypes.InferProps<typeof keyPropTypes>

const StyledAccidentalKey: React.FC<Props> = ({ keyChannels }) => {
  const hasKeyChannels = Array.isArray(keyChannels!) && keyChannels.length > 0
  return (
    <Base
      style={{
        // @ts-ignore
        '--color-accidental-key': hasKeyChannels ? `var(--color-channel-${keyChannels![0]!.channel})` : undefined,
      }}
    >
      <B19 />
      <B16 />
      <B17>
        <B2
          style={{
            opacity: hasKeyChannels ? 0.75 : '1',
          }}
        />
      </B17>
      <B18>
        <B3
          style={{
            opacity: hasKeyChannels ? 0.75 : '1',
          }}
        />
      </B18>
      <B4>
        <B5 />
      </B4>
      <B6
        style={{
          opacity: hasKeyChannels ? 0.5 : '1',
        }}
      >
        <B7 />
      </B6>
      <B8
        style={{
          paddingBottom: hasKeyChannels
            ? 'calc(3px * var(--size-scale-factor, 1))'
            : 'calc(5px * var(--size-scale-factor, 1))',
          opacity: hasKeyChannels ? 0.5 : '1',
        }}
      >
        <B9 />
      </B8>
      <B10
        style={{
          opacity: hasKeyChannels ? 3 : '4',
        }}
      >
        <B11 />
      </B10>
      <B12>
        <B13
          style={{
            opacity: hasKeyChannels ? 0.06 : '0.12',
          }}
        />
      </B12>
      <B14
        style={{
          height: hasKeyChannels
            ? 'calc(4px * var(--size-scale-factor, 1))'
            : 'calc(6px * var(--size-scale-factor, 1))',
          paddingBottom: hasKeyChannels
            ? 'calc(3px * var(--size-scale-factor, 1))'
            : 'calc(5px * var(--size-scale-factor, 1))',
          opacity: hasKeyChannels ? 0.5 : '1',
        }}
      >
        <B15 />
      </B14>
    </Base>
  )
}

StyledAccidentalKey.propTypes = keyPropTypes

export default StyledAccidentalKey
