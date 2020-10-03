import * as React from 'react'
import ReactDOM from 'react-dom'

import Keyboard, { KeyboardMap } from '../src'

interface SoundGenerator {
  changeInstrument(channel: number, patch: number): void,
  noteOn(channel: number, key: number, velocity: number): void,
  noteOff(channel: number, key: number, velocity: number): void,
  getInstrumentNames(): string[],
}

type MIDIMessage = [number, number, number?]

interface MIDIOutput {
  send(message: MIDIMessage): void
}

class MidiGenerator implements SoundGenerator {
  constructor(private output: MIDIOutput) {
  }

  noteOn(channel: number, key: number, velocity: number) {
    this.output.send([0b10010000 + channel, key, velocity])
  }

  noteOff(channel: number, key: number, velocity: number) {
    this.output.send([0b10000000 + channel, key, velocity])
  }

  changeInstrument(channel: number, patch: number) {
    this.output.send([0b11000000 + channel, patch])
  }

  getInstrumentNames(): string[] {
    return [
      'Acoustic Grand Piano',
      'Bright Acoustic Piano',
      'Electric Grand Piano',
      'Honky-tonk Piano',
      'Electric Piano 1',
      'Electric Piano 2',
      'Harpsichord',
      'Clavi',
      'Celesta',
      'Glockenspiel',
      'Music Box',
      'Vibraphone',
      'Marimba',
      'Xylophone',
      'Tubular Bells',
      'Dulcimer',
      'Drawbar Organ',
      'Percussive Organ',
      'Rock Organ',
      'Church Organ',
      'Reed Organ',
      'Accordion',
      'Harmonica',
      'Tango Accordion',
      'Acoustic Guitar (nylon)',
      'Acoustic Guitar (steel)',
      'Electric Guitar (jazz)',
      'Electric Guitar (clean)',
      'Electric Guitar (muted)',
      'Overdriven Guitar',
      'Distortion Guitar',
      'Guitar harmonics',
      'Acoustic Bass',
      'Electric Bass (finger)',
      'Electric Bass (pick)',
      'Fretless Bass',
      'Slap Bass 1',
      'Slap Bass 2',
      'Synth Bass 1',
      'Synth Bass 2',
      'Violin',
      'Viola',
      'Cello',
      'Contrabass',
      'Tremolo Strings',
      'Pizzicato Strings',
      'Orchestral Harp',
      'Timpani',
      'String Ensemble 1',
      'String Ensemble 2',
      'SynthStrings 1',
      'SynthStrings 2',
      'Choir Aahs',
      'Voice Oohs',
      'Synth Voice',
      'Orchestra Hit',
      'Trumpet',
      'Trombone',
      'Tuba',
      'Muted Trumpet',
      'French Horn',
      'Brass Section',
      'SynthBrass 1',
      'SynthBrass 2',
      'Soprano Sax',
      'Alto Sax',
      'Tenor Sax',
      'Baritone Sax',
      'Oboe',
      'English Horn',
      'Bassoon',
      'Clarinet',
      'Piccolo',
      'Flute',
      'Recorder',
      'Pan Flute',
      'Blown Bottle',
      'Shakuhachi',
      'Whistle',
      'Ocarina',
      'Lead 1 (square)',
      'Lead 2 (sawtooth)',
      'Lead 3 (calliope)',
      'Lead 4 (chiff)',
      'Lead 5 (charang)',
      'Lead 6 (voice)',
      'Lead 7 (fifths)',
      'Lead 8 (bass + lead)',
      'Pad 1 (new age)',
      'Pad 2 (warm)',
      'Pad 3 (polysynth)',
      'Pad 4 (choir)',
      'Pad 5 (bowed)',
      'Pad 6 (metallic)',
      'Pad 7 (halo)',
      'Pad 8 (sweep)',
      'FX 1 (rain)',
      'FX 2 (soundtrack)',
      'FX 3 (crystal)',
      'FX 4 (atmosphere)',
      'FX 5 (brightness)',
      'FX 6 (goblins)',
      'FX 7 (echoes)',
      'FX 8 (sci-fi)',
      'Sitar',
      'Banjo',
      'Shamisen',
      'Koto',
      'Kalimba',
      'Bag pipe',
      'Fiddle',
      'Shanai',
      'Tinkle Bell',
      'Agogo',
      'Steel Drums',
      'Woodblock',
      'Taiko Drum',
      'Melodic Tom',
      'Synth Drum',
      'Reverse Cymbal',
      'Guitar Fret Noise',
      'Breath Noise',
      'Seashore',
      'Bird Tweet',
      'Telephone Ring',
      'Helicopter',
      'Applause',
      'Gunshot',
    ]
  }
}

class WaveGenerator implements SoundGenerator {
  private output: AudioContext
  private sounds = 'sine triangle sawtooth square'.split(' ')
  private oscillators = new Array(16).fill({})
  private channels = new Array(16).fill(0)
  private baseFrequency = 440

  constructor() {
    const tryWindow = window as any
    const AudioContext = tryWindow.AudioContext || tryWindow['webkitAudioContext']
    this.output = new AudioContext()
  }

  private getKeyFrequency = (keyNumber: number, baseKeyNumber: number, baseKeyFrequency: number) => (
    baseKeyFrequency * Math.pow(
      Math.pow(2, 1 / 12),
      (keyNumber - baseKeyNumber),
    )
  )

  noteOn(channel: number, key: number, velocity: number) {
    if (this.oscillators[channel][key]) {
      this.oscillators[channel][key].stop()
      delete this.oscillators[channel][key]
    }

    this.oscillators[channel][key] = this.output.createOscillator()
    const gainNode = this.output.createGain()

    this.oscillators[channel][key].type = this.sounds[this.channels[channel]]
    this.oscillators[channel][key].connect(gainNode)
    gainNode.connect(this.output.destination)
    gainNode.gain.value = velocity * 0.001

    this.oscillators[channel][key].frequency.value = this.getKeyFrequency(key, 69, this.baseFrequency)
    this.oscillators[channel][key].start()
  }

  noteOff(channel: number, key: number, _velocity: number) {
    if (this.oscillators[channel][key]) {
      try {
        this.oscillators[channel][key].stop()
      } catch (err) {
      }
      delete this.oscillators[channel][key]
    }
  }

  changeInstrument(channel: number, patch: number) {
    this.channels[channel] = patch
  }

  getInstrumentNames(): string[] {
    return this.sounds
  }
}

const App = () => {
  const [channel, setChannel] = React.useState(0)
  const [keyChannels, setKeyChannels] = React.useState<{ key: number; velocity: number; channel: number }[]>([])
  const [instruments, setInstruments, ] = React.useState<string[]>([])
  const [instrument, setInstrument] = React.useState(0)
  const generator = React.useRef<SoundGenerator | undefined>(undefined)
  const scrollRef = React.useRef<HTMLDivElement>(null)

  const handleKeyOn = (newKeys: { key: number; velocity: number; channel: number; id: number }[]) => {
    setKeyChannels((oldKeys) => {
      const oldKeysKeys = oldKeys.map((k) => k.key)
      const newKeysKeys = newKeys.map((k) => k.key)
      const keysOff = oldKeys.filter((ok) => !newKeysKeys.includes(ok.key))
      const keysOn = newKeys.filter((nk) => !oldKeysKeys.includes(nk.key))

      keysOn.forEach((k) => {
        if (!generator.current) {
          return
        }
        generator.current.noteOn(k.channel, k.key, Math.floor(k.velocity * 127))
      })

      keysOff.forEach((k) => {
        if (!generator.current) {
          return
        }
        generator.current.noteOff(k.channel, k.key, Math.floor(k.velocity * 127))
      })

      return newKeys
    })
  }

  const handleChangeInstrument: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const { value: rawValue } = e.target
    const value = Number(rawValue)
    setInstrument(value)
  }

  const handleChangeChannel: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value: rawValue } = e.target
    const value = Number(rawValue)
    setChannel(value)
  }

  React.useEffect(() => {
    if (!generator.current) {
      return
    }
    generator.current.changeInstrument(channel, instrument)
  }, [channel, instrument])

  React.useEffect(() => {
    const { navigator: maybeNavigator } = window
    const navigator = maybeNavigator as Navigator & {
      requestMIDIAccess: () => Promise<{ outputs: Map<string, unknown> }>
    }
    if ('requestMIDIAccess' in navigator) {
      navigator.requestMIDIAccess().then((m) => {
        generator.current = new MidiGenerator(Array.from(m.outputs.values())[0] as MIDIOutput)
        setInstruments(generator.current!.getInstrumentNames())
        generator.current.changeInstrument(0, 0)
      })
    } else {
      generator.current = new WaveGenerator()
      setInstruments(generator.current!.getInstrumentNames())
      generator.current.changeInstrument(0, 0)
    }

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
        onChange={handleChangeChannel}
        defaultValue={0}
      />
      <select
        id="instrument"
        onChange={handleChangeInstrument}
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
