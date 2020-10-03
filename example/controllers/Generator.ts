import SoundGenerator from '../services/SoundGenerator'
import MidiGenerator from '../services/generators/MidiGenerator'
import WaveGenerator from '../services/generators/WaveGenerator'

type Load = () => Promise<SoundGenerator>

export const load: Load = async (): Promise<SoundGenerator> => {
  const { navigator: maybeNavigator } = window
  const navigator = maybeNavigator as Navigator & {
    requestMIDIAccess: () => Promise<{ outputs: Map<string, unknown> }>
  }

  if ('requestMIDIAccess' in navigator) {
    const m = await navigator.requestMIDIAccess()
    const outputs = Array.from(m.outputs.values()) as MIDIOutput[]
    if (outputs.length > 0) {
      return new MidiGenerator(outputs[0])
    }
  }

  return new WaveGenerator()
}
