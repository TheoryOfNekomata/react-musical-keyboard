import SoundGenerator from '../SoundGenerator'

export default class WaveGenerator implements SoundGenerator {
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
