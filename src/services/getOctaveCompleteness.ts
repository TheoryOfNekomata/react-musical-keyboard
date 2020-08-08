import mem from 'mem'
import getKeyXOffsetUnmemoized from './getKeyXOffset'
import isNaturalKeyUnmemoized from './isNaturalKey'

const getKeyXOffset = mem(getKeyXOffsetUnmemoized)
const isNaturalKey = mem(isNaturalKeyUnmemoized)

interface GetOctaveCompleteness {
  (firstKey: number, lastKey: number): number
}

// expect firstKey and lastKey within the same octave
const getOctaveCompleteness: GetOctaveCompleteness = (firstKey, lastKey) =>
  // see if there are missing higher notes
  getKeyXOffset(lastKey) +
  (isNaturalKey(lastKey) ? 1 / 7 : ((1 / 7) * 18) / 36) -
  // see if there are missing lower notes
  getKeyXOffset(firstKey)

export default getOctaveCompleteness
