import mem from 'mem'
import getKeyOctaveUnmemoized from './getKeyOctave'
import * as caches from './caches'

const getKeyOctave = mem(getKeyOctaveUnmemoized, { cache: caches.getKeyOctave })

type GetOctaveCount = (startKey: number, endKey: number) => number

const getOctaveCount: GetOctaveCount = (startKey, endKey) => getKeyOctave(endKey) - getKeyOctave(startKey) + 1

export default getOctaveCount
