import mem from 'mem'
import isNaturalKeyUnmemoized from './isNaturalKey'
import getOctaveCountUnmemoized from './getOctaveCount'
import getFractionalOctaveCountUnmemoized from './getFractionalOctaveCount'
import { ACCIDENTAL_KEY_TO_NATURAL_KEY_WIDTH_RATIO } from './constants'

export interface GetKeyWidth {
  (k: number): number
}

interface GetKeyWidthDecorator {
  (startKey: number, endKey: number): GetKeyWidth
}

const isNaturalKey = mem(isNaturalKeyUnmemoized)
const getFractionalOctaveCount = mem(getFractionalOctaveCountUnmemoized, { cacheKey: (args) => args.join(':') })
const getOctaveCount = mem(getOctaveCountUnmemoized, { cacheKey: (args) => args.join(':') })

const getKeyWidthDecorator: GetKeyWidthDecorator = (startKey, endKey) => {
  const getKeyWidth: GetKeyWidth = (k) => {
    const fractionalOctaveCount = getFractionalOctaveCount(startKey, endKey)
    const octaveCount = getOctaveCount(startKey, endKey)
    const naturalKeyWidth = (100 * (octaveCount / fractionalOctaveCount)) / (octaveCount * 7)
    return isNaturalKey(k) ? naturalKeyWidth : naturalKeyWidth * ACCIDENTAL_KEY_TO_NATURAL_KEY_WIDTH_RATIO
  }

  return mem(getKeyWidth)
}

export default getKeyWidthDecorator
