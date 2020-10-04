import * as React from 'react'
import ReactDOM from 'react-dom'

import Keyboard  from '../src'
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
  const [inputs, setInputs] = React.useState<any[]>([])
  const [input, setInput] = React.useState<number>()
  const generator = React.useRef<SoundGenerator | undefined>(undefined)
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const midiInputRef = React.useRef<any>(null)

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

  React.useEffect(() => {
    const loadMIDIInputs = async () => {
      const access = await navigator.requestMIDIAccess()
      const inputs = Array.from(access.inputs.entries()).map(([handle, input]) => ({
        handle,
        input,
      }))
      midiInputRef.current = inputs[0].input
      setInputs(inputs)
      if (inputs.length > 0) {
        setInput(0)
      }
    }

    loadMIDIInputs()
  }, [])

  React.useEffect(() => {
    const theInput = inputs[input]
    const handleMidiMessage = (e: any) => {
      const arg0 = e.data[0]
      const arg1 = e.data[1]
      const arg2 = e.data[2]

      const type = arg0 & 0b11110000
      if (type === 0b10010000 || type === 0b10000000) {
        return
      }
      if (generator.current! && 'sendMessage' in generator.current!) {
        generator.current!.sendMessage!(arg0 & 0b00001111, arg0 & 0b11110000, arg1, arg2)
      }
    }
    if (theInput) {
      theInput.input.addEventListener('midimessage', handleMidiMessage)
    }
    return () => {
      if (theInput) {
        theInput.input.removeEventListener('midimessage', handleMidiMessage)
      }
    }
  }, [inputs, input])

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
            startKey={0}
            endKey={127}
            keyChannels={keyChannels}
            height="100%"
            keyboardVelocity={0.75}
            onChange={Channel.handle({ setKeyChannels, generator: generator.current!, channel, })}
            keyboardMapping={keyboardMapping}
            midiInput={inputs.length > 0 && typeof input! === 'number' ? inputs[input].input : undefined}
          />
        </div>
      </div>
    </React.Fragment>
  )
}

const container = window.document.createElement('div')

container.style.display = 'contents'

window.document.body.appendChild(container)

ReactDOM.render(<App />, container)
