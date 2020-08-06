import getKeyXOffset from './getKeyXOffset'
import isNaturalKey from './isNaturalKey'

// expect firstKey and lastKey within the same octave
export default (firstKey: number, lastKey: number) => (
  // see if there are missing higher notes
  getKeyXOffset(lastKey) + (isNaturalKey(lastKey) ? 1 / 7 : 1 / 7 * 18/36)
  // see if there are missing lower notes
  - getKeyXOffset(firstKey)
)
