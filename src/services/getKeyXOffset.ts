import { KEY_OFFSETS } from './constants'

interface GetKeyXOffset {
  (k: number): number
}

const getKeyXOffset: GetKeyXOffset = (k) => {
  return KEY_OFFSETS[k % 12]
}

export default getKeyXOffset
