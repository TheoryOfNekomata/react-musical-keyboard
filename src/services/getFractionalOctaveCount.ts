import mem from 'mem'
import generateKeys from './generateKeys'
import groupKeysIntoOctaves from './groupKeysIntoOctaves'
import getOctaveCompletenessUnmemoized from './getOctaveCompleteness'
import * as caches from './caches'

const getOctaveCompleteness = mem(getOctaveCompletenessUnmemoized, { cache: caches.getOctaveCompleteness })

type GetFractionalOctaveCount = (startKey: number, endKey: number) => number

const getFractionalOctaveCount: GetFractionalOctaveCount = (startKey, endKey) => {
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

  return Object.values(octaveCompleteness).reduce((a, b) => a + b, 0)
}

export default getFractionalOctaveCount
