type GroupKeysIntoOctaves = (dummyKeys: number[]) => Record<number, number[]>

const groupKeysIntoOctaves: GroupKeysIntoOctaves = (dummyKeys) =>
  dummyKeys
    .map((k) => [k, Math.floor(k / 12)])
    .reduce<Record<number, number[]>>(
      (theOctaves, [key, keyOctave]) => ({
        ...theOctaves,
        [keyOctave]: Array.isArray(theOctaves[keyOctave]) ? [...theOctaves[keyOctave], key] : [key],
      }),
      {},
    )

export default groupKeysIntoOctaves
