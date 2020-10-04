export default interface SoundGenerator {
  changeInstrument(channel: number, patch: number): void,
  noteOn(channel: number, key: number, velocity: number): void,
  noteOff(channel: number, key: number, velocity: number): void,
  getInstrumentNames(): string[],
  sendMessage?(channel: number, type: number, arg1: number, arg2?: number): void,
}
