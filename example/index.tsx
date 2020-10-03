import * as React from 'react'
import ReactDOM from 'react-dom'

import Keyboard, { KeyboardMap } from '../src'
import * as Channel from './controllers/Channel'
import * as Instrument from './controllers/Instrument'
import * as Generator from './controllers/Generator'
import keyboardMapping from './services/keyboardMapping'
import SoundGenerator from './services/SoundGenerator'

const App = () => {
  const [channel, setChannel] = React.useState(0)
  const [keyChannels, setKeyChannels] = React.useState<{ key: number; velocity: number; channel: number }[]>([])
  const [instruments, setInstruments, ] = React.useState<string[]>([])
  const [instrument, setInstrument] = React.useState(0)
  const generator = React.useRef<SoundGenerator | undefined>(undefined)
  const scrollRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!generator.current) {
      return
    }
    Instrument.reflect({ generator: generator.current, channel, instrument })
  }, [channel, instrument])

  React.useEffect(() => {
    Generator
      .load()
      .then(g => {
        Instrument.initialize({ setInstruments, generator: generator.current = g, })
      })
  }, [])

  React.useEffect(() => {
    const { current } = scrollRef
    if (current) {
      current.scrollLeft = current.scrollWidth * 0.4668
    }
  }, [scrollRef])

  return (
    <React.Fragment>
      <input
        type="number"
        id="channel"
        min={0}
        max={15}
        onChange={Channel.change({ setChannel, })}
        defaultValue={0}
      />
      <select
        id="instrument"
        onChange={Instrument.change({ setInstrument, })}
        defaultValue={0}
      >
        {Array.isArray(instruments) && instruments.map((name, i) => (
          <option
            key={i}
            value={i}
          >
            {name}
          </option>
        ))}
      </select>
      <div
        id="keyboard"
        ref={scrollRef}
      >
        <div
          id="keyboard-scroll"
        >
          <Keyboard
            hasMap
            startKey={0}
            endKey={127}
            keyChannels={keyChannels}
            height="100%"
          >
            <KeyboardMap
              channel={channel}
              onChange={Channel.handle({ setKeyChannels, generator: generator.current!, })}
              keyboardMapping={keyboardMapping}
            />
          </Keyboard>
        </div>
      </div>
    </React.Fragment>
  )
}

const container = window.document.createElement('div')

container.style.display = 'contents'

window.document.body.appendChild(container)

ReactDOM.render(<App />, container)
