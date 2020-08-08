import getKeyXOffset from './getKeyXOffset'
import getOctaveCount from './getOctaveCount'
import generateKeys from './generateKeys'
import groupKeysIntoOctaves from './groupKeysIntoOctaves'
import getOctaveCompleteness from './getOctaveCompleteness'

interface GetKeyLeft {
  (k: number): number
}

interface GetKeyLeftDecorator {
  (startKey: number, endKey: number): GetKeyLeft
}

const getKeyLeftDecorator: GetKeyLeftDecorator = (startKey, endKey): GetKeyLeft => (k) => {
  const dummyKeys = generateKeys(startKey, endKey)
  const keysGroupedIntoOctaves = groupKeysIntoOctaves(dummyKeys)
  const octaveCompleteness = Object.entries(keysGroupedIntoOctaves)
    .map<number[]>(([octave, keys]) => [(octave as unknown) as number, keys[0], keys.slice(-1)[0]])
    .reduce<Record<number, number>>(
      (theOctaveCompleteness, [octave, firstKey, lastKey]) => ({
        ...theOctaveCompleteness,
        [octave]: getOctaveCompleteness(firstKey, lastKey),
      }),
      {},
    )

  const fractionalOctaveCount = Object.values(octaveCompleteness).reduce((a, b) => a + b, 0)
  const octaveCount = getOctaveCount(startKey, endKey)

  const startOctave = Math.floor(startKey! / 12)
  const octave = Math.floor(k / 12)
  const octaveOffset = ((100 * octaveCount) / fractionalOctaveCount / octaveCount) * (octave - startOctave)
  const theKeyOffset = octaveOffset + ((100 * octaveCount) / fractionalOctaveCount / octaveCount) * getKeyXOffset(k)
  const firstKeyOffset = ((100 * octaveCount) / fractionalOctaveCount / octaveCount) * getKeyXOffset(startKey + 12)
  return theKeyOffset - firstKeyOffset
}

export default getKeyLeftDecorator
