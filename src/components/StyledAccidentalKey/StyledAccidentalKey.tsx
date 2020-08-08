import * as React from 'react'
import * as PropTypes from 'prop-types'
import keyPropTypes from '../../services/keyPropTypes'
import styled from 'styled-components'

const Base = styled('div')({
  width: '100%',
  height: '100%',
  position: 'relative',
})

const B1 = styled('div')`
  width: 100%;
  height: 100%;
  position: relative;
  border-radius: 1px;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
`
const B2 = styled('div')`
  width: 100%;
  height: 100%;
  border-radius: 0 0 1px 1px;
  background-color: var(--color-accidental-key, currentColor);
  mask-image: linear-gradient(to bottom, white, rgba(0, 0, 0, 0.9));
`
const B3 = styled('div')`
  width: 100%;
  height: 100%;
  background-color: var(--color-accidental-key, currentColor);
`
const B4 = styled('div')`
  width: 100%;
  height: 4px;
  padding: 1px 0 0 0;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
`
const B5 = styled('div')`
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.12;
`
const B6 = styled('div')`
  width: 2px;
  height: 11px;
  padding: 1px 1px 1px 0;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  right: 0;
`
const B7 = styled('div')`
  width: 100%;
  height: 100%;
  background-color: white;
  mask-image: linear-gradient(to bottom, transparent, white);
  opacity: 0.4;
`
const B8 = styled('div')`
  width: 2px;
  height: 100%;
  padding: 10px 1px 6px 0;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  right: 0;
`
const B9 = styled('div')`
  width: 100%;
  height: 100%;
  background-color: white;
  opacity: 0.4;
  border-bottom-right-radius: 1px;
`
const B10 = styled('div')`
  width: 100%;
  padding: 0 1px 1px 1px;
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  left: 0;
`
const B11 = styled('div')`
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 4px 4px 1px 1px;
  opacity: 0.12;
`
const B12 = styled('div')`
  width: 100%;
  height: 100%;
  padding: 3px 3px 7px 2px;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
`
const B13 = styled('div')`
  width: 100%;
  height: 100%;
  background-color: white;
  mask-image: linear-gradient(to bottom, transparent, white);
  border-radius: 99999px;
`
const B14 = styled('div')`
  width: 100%;
  height: 6px;
  padding: 0 1px 5px 1px;
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  left: 0;
`
const B15 = styled('div')`
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 0 0 1px 1px;
  opacity: 0.4;
`

const B16 = styled('div')({
  width: '100%',
  height: '100%',
  backgroundColor: 'black',
  position: 'absolute',
  top: 0,
  left: 0,
})

const B17 = styled('div')`
  width: 100%;
  height: calc(6 / 50 * 100%);
  padding: 0 1px 1px;
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  left: 0;
`

const B18 = styled('div')`
  width: 100%;
  height: calc(44 / 50 * 100%);
  padding: 1px 1px 0;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  left: 0;
`

type Props = PropTypes.InferProps<typeof keyPropTypes>

const StyledAccidentalKey: React.FC<Props> = ({ keyChannels }) => {
  const hasKeyChannels = Array.isArray(keyChannels!) && keyChannels.length > 0
  return (
    <Base>
      <B1
        style={{
          // @ts-ignore
          '--color-accidental-key': hasKeyChannels ? `var(--color-channel-${keyChannels![0]!.channel})` : undefined,
        }}
      >
        <B16 />
        <B17>
          <B2
            style={{
              opacity: hasKeyChannels ? 0.75 : 1,
            }}
          />
        </B17>
        <B18>
          <B3
            style={{
              opacity: hasKeyChannels ? 0.75 : 1,
            }}
          />
        </B18>
        <B4>
          <B5 />
        </B4>
        <B6
          style={{
            opacity: hasKeyChannels ? 0.5 : 1,
          }}
        >
          <B7 />
        </B6>
        <B8
          style={{
            paddingBottom: hasKeyChannels ? 3 : 5,
            opacity: hasKeyChannels ? 0.5 : 1,
          }}
        >
          <B9 />
        </B8>
        <B10
          style={{
            opacity: hasKeyChannels ? 3 : 4,
          }}
        >
          <B11 />
        </B10>
        <B12>
          <B13
            style={{
              opacity: hasKeyChannels ? 0.06 : 0.12,
            }}
          />
        </B12>
        <B14
          style={{
            height: hasKeyChannels ? 4 : 6,
            paddingBottom: hasKeyChannels ? 3 : 5,
            opacity: hasKeyChannels ? 0.5 : 1,
          }}
        >
          <B15 />
        </B14>
      </B1>
    </Base>
  )
}

StyledAccidentalKey.propTypes = keyPropTypes

export default StyledAccidentalKey
