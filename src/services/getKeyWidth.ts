import isNaturalKey from './isNaturalKey'
import groupKeysIntoOctaves from './groupKeysIntoOctaves'
import getOctaveCompleteness from './getOctaveCompleteness'
import getOctaveCount from './getOctaveCount'
import generateKeys from './generateKeys'

interface GetKeyWidth {
  (k: number): number
}

interface GetKeyWidthDecorator {
  (startKey: number, endKey: number): GetKeyWidth
}

const ACCIDENTAL_KEY_TO_NATURAL_KEY_WIDTH_RATIO = 13 / 23

const getKeyWidthDecorator: GetKeyWidthDecorator = (startKey, endKey): GetKeyWidth => (k) => {
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
  const naturalKeyWidth = (100 * (octaveCount / fractionalOctaveCount)) / (octaveCount * 7)
  return isNaturalKey(k) ? naturalKeyWidth : naturalKeyWidth * ACCIDENTAL_KEY_TO_NATURAL_KEY_WIDTH_RATIO
}

export default getKeyWidthDecorator
