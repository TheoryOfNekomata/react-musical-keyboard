import * as React from 'react'
import * as PropTypes from 'prop-types'
import styled from 'styled-components'
import keyPropTypes from '../../services/keyPropTypes'

const Base = styled('div')({
  width: '100%',
  height: '100%',
  position: 'relative',
})

const N1 = styled('div')`
  width: 100%;
  height: 100%;
  position: relative;
`

const N2 = styled('div')`
  width: 100%;
  height: 100%;
  background-color: black;
  position: absolute;
  top: 0;
  left: 0;
`

const N3 = styled('div')`
  width: 100%;
  height: 100%;
  padding: 1px 0 1px 1px;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
`

const N4 = styled('div')`
  width: 100%;
  height: 100%;
  background-color: var(--color-natural-key, #e3e3e5);
  border-radius: 0 0 1px 1px;
`

const N5 = styled('div')`
  width: 100%;
  height: calc(33 / 80 * 100%);
  padding: 0 1px 2px 2px;
  box-sizing: border-box;
  background-clip: content-box;
  position: absolute;
  bottom: 0;
  left: 0;
  opacity: 0.25;
  mask-image: linear-gradient(to bottom, transparent, white);
`

const N6 = styled('div')`
  width: 100%;
  height: 100%;
  background-color: black;
  padding: 1px 2px 3px 3px;
  box-sizing: border-box;
  background-clip: content-box;
  position: absolute;
  bottom: 0;
  left: 0;
  opacity: 0.08;
  mask-image: linear-gradient(to bottom, transparent, white);
`

const N7 = styled('div')`
  width: 100%;
  height: 2px;
  padding: 0 0 1px 1px;
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  left: 0;
`

const N8 = styled('div')`
  width: 100%;
  height: 100%;
  background-color: black;
  border-radius: 0 0 1px 1px;
  opacity: 0.25;
`
const N9 = styled('div')`
  width: 2px;
  height: 100%;
  padding: 1px 0 1px 1px;
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  left: 0;
`
const N10 = styled('div')`
  width: 100%;
  height: 100%;
  background-color: black;
  border-radius: 0 0 0 1px;
  opacity: 0.07;
`
const N11 = styled('div')`
  width: 100%;
  height: 6px;
  padding: 1px 0 0 1px;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
`
const N12 = styled('div')`
  width: 100%;
  height: 100%;
  background-color: black;
  mask-image: linear-gradient(to bottom, white, transparent);
  opacity: 0.12;
`
const N13 = styled('div')`
  width: 100%;
  padding: 1px 0 0 1px;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
`
const N14 = styled('div')`
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.12;
`
const N15 = styled('div')`
  width: 1px;
  height: 100%;
  padding: 1px 0 1px 0;
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  right: 0;
`
const N16 = styled('div')`
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 0 0 1px 0;
  opacity: 0.12;
`

type Props = PropTypes.InferProps<typeof keyPropTypes>

const StyledNaturalKey: React.FC<Props> = ({ keyChannels }) => {
  const hasKeyChannels = Array.isArray(keyChannels!) && keyChannels.length > 0
  return (
    <Base>
      <N1
        style={{
          // @ts-ignore
          '--color-natural-key': hasKeyChannels ? `var(--color-channel-${keyChannels![0]!.channel})` : undefined,
        }}
      >
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
            backgroundColor: hasKeyChannels ? 'black' : 'white',
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
            height: hasKeyChannels ? 4 : 3,
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
