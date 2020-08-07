import * as React from 'react'
import * as PropTypes from 'prop-types'
import styled from 'styled-components'
import Keyboard, { propTypes, } from './Keyboard'

export default {
  title: 'Keyboard',
}

type Props = PropTypes.InferProps<typeof propTypes>

// By passing optional props to this story, you can control the props of the component when
// you consume the story in a test.
export const Default = (props?: Partial<Props>) => (
  <Keyboard
    {...props}
    startKey={21}
    endKey={108}
  />
)

export const WithActiveKeys = (props?: Partial<Props>) => (
  <Keyboard
    {...props}
    startKey={21}
    endKey={108}
    keyChannels={[
      {
        channel: 0,
        key: 60,
        velocity: 1,
      },
      {
        channel: 0,
        key: 64,
        velocity: 1,
      },
      {
        channel: 0,
        key: 67,
        velocity: 1,
      },
    ]}
  />
)

const Base = styled('div')({
  width: '100%',
  height: '100%',
  position: 'relative',
  '--natural-key-color': '#e3e3e5',
  '--accidental-key-color': '#35313b',
})

const N1 = styled('div')`width: 100%; height: 100%; position: relative;`

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
          background-color: var(--natural-key-color, white);
          border-radius: 0 0 1px 1px;
`

const N5 = styled('div')`
width: 100%;
        height: calc(33 / 80 * 100%);
        background-color: white;
        padding: 0 1px 2px 2px;
        box-sizing: border-box;
        background-clip: content-box;
        position: absolute;
        bottom: 0;
        left: 0;
        opacity: 0.25;
        mask-image: linear-gradient(to bottom, transparent, white);
        -webkit-mask-image: linear-gradient(to bottom, transparent, white);
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
        -webkit-mask-image: linear-gradient(to bottom, transparent, white);
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
          -webkit-mask-image: linear-gradient(to bottom, white, transparent);
          opacity: 0.12;
`
const N13 = styled('div')`
width: 100%;
        height: 3px;
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

const N17 = styled('div')`
  padding: 1px 0 1px 1px;
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`

const N18 = styled('div')`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 0 0 1px 1px;
  overflow: hidden;
`

const B1 = styled('div')`
width: 100%;
      height: 100%;
      position: relative;
      border-radius: 1px;
      box-shadow: 0 0 0 1px rgba(0,0,0,0.25);
`
const B2 = styled('div')`
width: 100%;
        height: calc(6 / 50 * 100%);
        position: absolute;
        border-radius: 0 0 1px 1px;
        bottom: 0;
        left: 0;
        background-color: var(--accidental-key-color, #222);
        mask-image: linear-gradient(to bottom, white, rgba(0,0,0,0.9));
        -webkit-mask-image: linear-gradient(to bottom, white, rgba(0,0,0,0.9));
`
const B3 = styled('div')`
width: 100%;
        height: calc(44 / 50 * 100%);
        position: absolute;
        top: 0;
        left: 0;
        background-color: var(--accidental-key-color, #222);
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
          -webkit-mask-image: linear-gradient(to bottom, transparent, white);
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
`
const B10 = styled('div')`
width: 100%;
        height: 4px;
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
          -webkit-mask-image: linear-gradient(to bottom, transparent, white);
          border-radius: 99999px;
          opacity: 0.12;
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

const B16 = styled('div')`
  padding: 1px 1px 1px 1px;
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`

const B17 = styled('div')`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 0 0 1px 1px;
  overflow: hidden;
`

export const Styled = (props?: Partial<Props>) => (
  <Keyboard
    {...props}
    startKey={21}
    endKey={108}
    keyChannels={[
      {
        channel: 0,
        key: 60,
        velocity: 1,
      },
      {
        channel: 0,
        key: 63,
        velocity: 1,
      },
      {
        channel: 0,
        key: 67,
        velocity: 1,
      },
    ]}
    keyComponents={{
      natural: ({ children, }) => (
        <Base>
          <N1>
            <N2></N2>
            <N3>
              <N4></N4>
            </N3>
            <N5></N5>
            <N6></N6>
            <N7>
              <N8></N8>
            </N7>
            <N9>
              <N10></N10>
            </N9>
            <N11>
              <N12></N12>
            </N11>
            <N13>
              <N14></N14>
            </N13>
            <N15>
              <N16></N16>
            </N15>
          </N1>
          <N17>
            <N18>
              {children}
            </N18>
          </N17>
        </Base>
      ),
      accidental: ({ children, }) => (
        <Base>
          <B1>
            <B2></B2>
            <B3></B3>
            <B4>
              <B5></B5>
            </B4>
            <B6>
              <B7></B7>
            </B6>
            <B8>
              <B9></B9>
            </B8>
            <B10>
              <B11></B11>
            </B10>
            <B12>
              <B13></B13>
            </B12>
            <B14>
              <B15></B15>
            </B14>
          </B1>
          <B16>
            <B17>
              {children}
            </B17>
          </B16>
        </Base>
      ),
    }}
  />
)
