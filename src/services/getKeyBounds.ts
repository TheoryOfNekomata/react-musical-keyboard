type Bounds = {
  left: number
  right: number
}

type GetKeyBounds = (
  startKey: number,
  endKey: number,
  getKeyLeft: (key: number) => number,
  getKeyWidth: (key: number) => number,
) => (key: number, left: number, width: number) => Bounds

const getKeyBounds: GetKeyBounds = (startKey, endKey, getKeyLeft, getKeyWidth) => (key, left, width) => {
  switch (key % 12) {
    case 0:
    case 5:
      return {
        left,
        right: key + 1 > endKey! ? left + width : getKeyLeft(key + 1),
      }
    case 4:
    case 11:
      return {
        left: key - 1 < startKey! ? left : getKeyLeft(key - 1) + getKeyWidth(key - 1),
        right: left + width,
      }
    case 2:
    case 7:
    case 9:
      return {
        left: key - 1 < startKey! ? left : getKeyLeft(key - 1) + getKeyWidth(key - 1),
        right: key + 1 > endKey! ? left + width : getKeyLeft(key + 1),
      }
    default:
      break
  }
  return {
    left,
    right: left + width,
  }
}

export default getKeyBounds
