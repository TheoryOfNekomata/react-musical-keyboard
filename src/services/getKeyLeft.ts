import mem from 'mem'
import getKeyXOffsetUnmemoized from './getKeyXOffset'
import getOctaveCountUnmemoized from './getOctaveCount'
import getFractionalOctaveCountUnmemoized from './getFractionalOctaveCount'
import getKeyOctaveUnmemoized from './getKeyOctave'
import * as caches from './caches'

const getKeyXOffset = mem(getKeyXOffsetUnmemoized, { cache: caches.getKeyXOffset })
const getOctaveCount = mem(getOctaveCountUnmemoized, { cacheKey: (args) => args.join(':') })
const getFractionalOctaveCount = mem(getFractionalOctaveCountUnmemoized, { cacheKey: (args) => args.join(':') })
const getKeyOctave = mem(getKeyOctaveUnmemoized, { cache: caches.getKeyOctave })

type GetKeyLeft = (startKey: number, endKey: number) => (k: number) => number

const getKeyLeft: GetKeyLeft = (startKey, endKey) => (k) => {
  const fractionalOctaveCount = getFractionalOctaveCount(startKey, endKey)
  const octaveCount = getOctaveCount(startKey, endKey)
  const startOctave = getKeyOctave(startKey)
  const octave = getKeyOctave(k)
  const octaveOffset = ((100 * octaveCount) / fractionalOctaveCount / octaveCount) * (octave - startOctave)
  const theKeyOffset = octaveOffset + ((100 * octaveCount) / fractionalOctaveCount / octaveCount) * getKeyXOffset(k)
  const firstKeyOffset = ((100 * octaveCount) / fractionalOctaveCount / octaveCount) * getKeyXOffset(startKey + 12)
  return theKeyOffset - firstKeyOffset
}

export default getKeyLeft
