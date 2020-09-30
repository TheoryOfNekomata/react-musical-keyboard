type GenerateKeys = (startKey: number, endKey: number) => number[]

const generateKeys: GenerateKeys = (startKey, endKey) =>
  Array(endKey - startKey + 1)
    .fill(0)
    .map((_, i) => startKey + i)

export default generateKeys
