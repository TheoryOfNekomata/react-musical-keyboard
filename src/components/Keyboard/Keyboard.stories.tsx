import * as React from 'react'
import * as PropTypes from 'prop-types'
import StyledAccidentalKey from '../StyledAccidentalKey/StyledAccidentalKey'
import StyledNaturalKey from '../StyledNaturalKey/StyledNaturalKey'
import Keyboard, { propTypes } from './Keyboard'

const Wrapper: React.FC = (props) => (
  <div
    {...props}
    style={{
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
          key: 60,
          velocity: 1,
        },
        {
          key: 64,
          velocity: 1,
        },
        {
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
  <div
    style={{
      // @ts-ignore
      '--color-accidental-key': '#35313b',
      '--color-natural-key': '#e3e3e5',
    }}
  >
    <Wrapper>
      <Keyboard
        {...props}
        startKey={21}
        endKey={108}
        keyChannels={[
          {
            key: 60,
            velocity: 1,
          },
          {
            key: 63,
            velocity: 1,
          },
          {
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
  </div>
)

export const AnotherStyled = (props?: Partial<Props>) => (
  <div
    style={{
      // @ts-ignore
      '--size-scale-factor': 2,
      '--color-accidental-key': '#35313b',
      '--color-natural-key': '#e3e3e5',
    }}
  >
    <Wrapper>
      <Keyboard
        {...props}
        startKey={21}
        endKey={108}
        keyChannels={[
          {
            key: 60,
            velocity: 1,
          },
          {
            key: 63,
            velocity: 1,
          },
          {
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
  </div>
)

export const DarkStyled = (props?: Partial<Props>) => (
  <div
    style={{
      // @ts-ignore
      '--size-scale-factor': 2,
      '--color-accidental-key': '#666666',
      '--color-natural-key': '#35313b',
      '--color-active-key': 'red',
    }}
  >
    <Wrapper>
      <Keyboard
        {...props}
        startKey={21}
        endKey={108}
        keyChannels={[
          {
            key: 60,
            velocity: 1,
          },
          {
            key: 63,
            velocity: 1,
          },
          {
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
  </div>
)

const HasMapComponent = () => {
  const [keyChannels, setKeyChannels] = React.useState<{ key: number; velocity: number; channel: number }[]>([])
  const midiAccess = React.useRef<any>(undefined)

  const handleKeyOn = (newKeys: { key: number; velocity: number; channel: number; id: number }[]) => {
    setKeyChannels((oldKeys) => {
      const oldKeysKeys = oldKeys.map((k) => k.key)
      const newKeysKeys = newKeys.map((k) => k.key)
      const keysOff = oldKeys.filter((ok) => !newKeysKeys.includes(ok.key))
      const keysOn = newKeys.filter((nk) => !oldKeysKeys.includes(nk.key))
      const channel = 0

      keysOn.forEach((k) => {
        midiAccess.current?.send([0b10010000 + channel, k.key, Math.floor(k.velocity * 127)])
      })

      keysOff.forEach((k) => {
        midiAccess.current?.send([0b10000000 + channel, k.key, Math.floor(k.velocity * 127)])
      })

      return newKeys
    })
  }

  React.useEffect(() => {
    const { navigator: maybeNavigator } = window
    const navigator = maybeNavigator as Navigator & {
      requestMIDIAccess: () => Promise<{ outputs: Map<string, unknown> }>
    }
    if ('requestMIDIAccess' in navigator) {
      navigator.requestMIDIAccess().then((m) => {
        midiAccess.current = Array.from(m.outputs.values())[0]
      })
    }
  }, [])

  return (
    <Wrapper>
      <Keyboard
        hasMap
        startKey={21}
        endKey={108}
        keyChannels={keyChannels}
        onChange={handleKeyOn}
        keyboardMapping={{
          KeyQ: 60,
          Digit2: 61,
          KeyW: 62,
          Digit3: 63,
          KeyE: 64,
          KeyR: 65,
          Digit5: 66,
          KeyT: 67,
          Digit6: 68,
          KeyY: 69,
          Digit7: 70,
          KeyU: 71,
          KeyI: 72,
          Digit9: 73,
          KeyO: 74,
          Digit0: 75,
          KeyP: 76,
          BracketLeft: 77,
          Equal: 78,
          BracketRight: 79,

          KeyZ: 48,
          KeyS: 49,
          KeyX: 50,
          KeyD: 51,
          KeyC: 52,
          KeyV: 53,
          KeyG: 54,
          KeyB: 55,
          KeyH: 56,
          KeyN: 57,
          KeyJ: 58,
          KeyM: 59,
          Comma: 60,
          KeyL: 61,
          Period: 62,
          Semicolon: 63,
          Slash: 64,
        }}
      />
    </Wrapper>
  )
}

export const HasMap = () => <HasMapComponent />

export const Checkbox = (props?: Partial<Props>) => (
  <Wrapper>
    <Keyboard {...props} startKey={21} endKey={108} behavior="checkbox" name="checkbox" />
  </Wrapper>
)

export const Radio = (props?: Partial<Props>) => (
  <Wrapper>
    <Keyboard {...props} startKey={21} endKey={108} behavior="radio" name="radio" />
  </Wrapper>
)

export const Link = (props?: Partial<Props>) => (
  <Wrapper>
    <Keyboard {...props} startKey={21} endKey={108} behavior="link" href={(key) => `?key=${key}`} />
  </Wrapper>
)
