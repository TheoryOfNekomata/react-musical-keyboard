import * as React from 'react'
import * as PropTypes from 'prop-types'
import StyledAccidentalKey from '../StyledAccidentalKey/StyledAccidentalKey'
import StyledNaturalKey from '../StyledNaturalKey/StyledNaturalKey'
import Keyboard, { propTypes } from './Keyboard'

interface WrapperProps {
  style?: object | null
}

const Wrapper: React.FC<WrapperProps> = ({ style, ...etcProps }) => (
  <div
    {...etcProps}
    style={{
      ...style,
      // @ts-ignore
      '--color-channel-0': '#f55',
      '--color-channel-1': '#ff0',
      '--color-channel-2': '#0a0',
      '--color-channel-3': '#05a',
      '--color-channel-4': '#a0f',
      '--color-channel-5': '#a00',
      '--color-channel-6': '#a50',
      '--color-channel-7': '#fa0',
      '--color-channel-8': '#0f0',
      '--color-channel-9': '#0aa',
      '--color-channel-10': '#0ff',
      '--color-channel-11': '#f0a',
      '--color-channel-12': '#aa0',
      '--color-channel-13': '#550',
      '--color-channel-14': '#50a',
      '--color-channel-15': '#f5f',
    }}
  />
)

export default {
  title: 'Keyboard',
}

type Props = PropTypes.InferProps<typeof propTypes>

// By passing optional props to this story, you can control the props of the component when
// you consume the story in a test.
export const Default = (props?: Partial<Props>) => (
  <Wrapper>
    <Keyboard {...props} startKey={21} endKey={108} />
  </Wrapper>
)

export const WithActiveKeys = (props?: Partial<Props>) => (
  <Wrapper>
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
  </Wrapper>
)

export const WithDifferentKeyRange = (props?: Partial<Props>) => (
  <Wrapper>
    <Keyboard {...props} height={300} startKey={48} endKey={71} />
  </Wrapper>
)

export const Styled = (props?: Partial<Props>) => (
  <Wrapper
    style={{
      // @ts-ignore
      '--color-natural-key': '#e3e3e5',
      '--color-accidental-key': '#35313b',
    }}
  >
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
        natural: StyledNaturalKey,
        accidental: StyledAccidentalKey,
      }}
    />
  </Wrapper>
)
