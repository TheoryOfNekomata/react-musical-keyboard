import * as React from 'react'
import SoundGenerator from '../services/SoundGenerator'

type ChangeProps = {
  setChannel(channel: number): void
}

type Change = (props: ChangeProps) => React.ChangeEventHandler<HTMLInputElement>

export const change: Change = ({ setChannel }) => e => {
  const { value: rawValue } = e.target
  const value = Number(rawValue)
  setChannel(value)
}

type KeyChannel = {
  key: number,
  velocity: number,
  channel: number,
}

type KeyChannelCallback = (oldKeys: KeyChannel[]) => KeyChannel[]

type HandleProps = {
  setKeyChannels(callback: KeyChannelCallback | KeyChannel[]): void,
  generator?: SoundGenerator,
}
type Handle = (props: HandleProps) => (newKeys: KeyChannel[]) => void
export const handle: Handle = ({ setKeyChannels, generator, }) => newKeys => {
  setKeyChannels((oldKeys) => {
    if (generator! !== undefined) {
      const oldKeysKeys = oldKeys.map((k) => k.key)
      const newKeysKeys = newKeys.map((k) => k.key)
      const keysOff = oldKeys.filter((ok) => !newKeysKeys.includes(ok.key))
      const keysOn = newKeys.filter((nk) => !oldKeysKeys.includes(nk.key))

      keysOn.forEach((k) => {
        generator.noteOn(k.channel, k.key, Math.floor(k.velocity * 127))
      })

      keysOff.forEach((k) => {
        generator.noteOff(k.channel, k.key, Math.floor(k.velocity * 127))
      })
    }

    return newKeys
  })
}
