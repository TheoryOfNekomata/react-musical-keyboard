export type MIDIMessageEventHandler = (e: MIDIMessageEvent) => void

export interface MIDIInput {
  addEventListener(event: 'onmidimessage', handler: MIDIMessageEventHandler): void
  removeEventListener(event: 'onmidimessage', handler: MIDIMessageEventHandler): void
}

export interface MIDIMessageEvent {
  data: Uint8Array
}
