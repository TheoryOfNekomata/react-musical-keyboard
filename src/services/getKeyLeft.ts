import mem from 'mem'
import getKeyXOffsetUnmemoized from './getKeyXOffset'
import getOctaveCountUnmemoized from './getOctaveCount'
import getFractionalOctaveCountUnmemoized from './getFractionalOctaveCount'
import getKeyOctaveUnmemoized from './getKeyOctave'

const getKeyXOffset = mem(getKeyXOffsetUnmemoized)
const getOctaveCount = mem(getOctaveCountUnmemoized, { cacheKey: (args) => args.join(':') })
const getFractionalOctaveCount = mem(getFractionalOctaveCountUnmemoized, { cacheKey: (args) => args.join(':') })
const getKeyOctave = mem(getKeyOctaveUnmemoized)

interface GetKeyLeft {
  (k: number): number
}

interface GetKeyLeftDecorator {
  (startKey: number, endKey: number): GetKeyLeft
}

const getKeyLeftDecorator: GetKeyLeftDecorator = (startKey, endKey): GetKeyLeft => (k) => {
  const fractionalOctaveCount = getFractionalOctaveCount(startKey, endKey)
  const octaveCount = getOctaveCount(startKey, endKey)
  const startOctave = getKeyOctave(startKey)
  const octave = getKeyOctave(k)
  const octaveOffset = ((100 * octaveCount) / fractionalOctaveCount / octaveCount) * (octave - startOctave)
  const theKeyOffset = octaveOffset + ((100 * octaveCount) / fractionalOctaveCount / octaveCount) * getKeyXOffset(k)
  const firstKeyOffset = ((100 * octaveCount) / fractionalOctaveCount / octaveCount) * getKeyXOffset(startKey + 12)
  return theKeyOffset - firstKeyOffset
}

export default getKeyLeftDecorator
