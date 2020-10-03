import * as React from 'react'
import SoundGenerator from '../services/SoundGenerator'

type ChangeProps = {
  setInstrument(instrument: number): void
}
type Change = (props: ChangeProps) => React.ChangeEventHandler<HTMLSelectElement>
export const change: Change = ({ setInstrument }) => e => {
  const { value: rawValue } = e.target
  const value = Number(rawValue)
  setInstrument(value)
}

type InitializeProps = {
  setInstruments(instruments: string[]): void,
  generator: SoundGenerator,
}
type Initialize = (props: InitializeProps) => void
export const initialize: Initialize = ({ setInstruments, generator }) => {
  setInstruments(generator.getInstrumentNames())
  generator.changeInstrument(0, 0)
}

type ReflectProps = {
  generator: SoundGenerator,
  channel: number,
  instrument: number,
}
type Reflect = (props: ReflectProps) => void
export const reflect: Reflect = ({ generator, channel, instrument, }) => {
  generator.changeInstrument(channel, instrument)
}
