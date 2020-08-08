import mem from 'mem'
import getKeyOctaveUnmemoized from './getKeyOctave'

const getKeyOctave = mem(getKeyOctaveUnmemoized)

interface GetOctaveCount {
  (startKey: number, endKey: number): number
}

const getOctaveCount: GetOctaveCount = (startKey, endKey) => getKeyOctave(endKey) - getKeyOctave(startKey) + 1

export default getOctaveCount
