import mem from 'mem'
import isNaturalKeyUnmemoized from './isNaturalKey'
import getOctaveCountUnmemoized from './getOctaveCount'
import getFractionalOctaveCountUnmemoized from './getFractionalOctaveCount'
import { ACCIDENTAL_KEY_TO_NATURAL_KEY_WIDTH_RATIO } from './constants'
import * as caches from './caches'

type GetKeyWidthDecorator = (startKey: number, endKey: number) => (k: number) => number

const isNaturalKey = mem(isNaturalKeyUnmemoized, { cache: caches.isNaturalKey })
const getFractionalOctaveCount = mem(getFractionalOctaveCountUnmemoized, {
  cacheKey: (args) => args.join(':'),
})
const getOctaveCount = mem(getOctaveCountUnmemoized, { cacheKey: (args) => args.join(':') })

const getKeyWidth: GetKeyWidthDecorator = (startKey, endKey) => (k) => {
  const fractionalOctaveCount = getFractionalOctaveCount(startKey, endKey)
  const octaveCount = getOctaveCount(startKey, endKey)
  const naturalKeyWidth = (100 * (octaveCount / fractionalOctaveCount)) / (octaveCount * 7)
  return isNaturalKey(k) ? naturalKeyWidth : naturalKeyWidth * ACCIDENTAL_KEY_TO_NATURAL_KEY_WIDTH_RATIO
}

export default getKeyWidth
