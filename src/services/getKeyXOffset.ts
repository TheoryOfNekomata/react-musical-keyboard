import KEY_OFFSETS from './constants/keyOffsets'

export default (k: number): number => {
  return KEY_OFFSETS[k % 12]
}
