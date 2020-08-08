export default (dummyKeys: number[]): Record<number, number[]> =>
  dummyKeys
    .map((k) => [k, Math.floor(k / 12)])
    .reduce<Record<number, number[]>>(
      (theOctaves, [key, keyOctave]) => ({
        ...theOctaves,
        [keyOctave]: Array.isArray(theOctaves[keyOctave]) ? [...theOctaves[keyOctave], key] : [key],
      }),
      {},
    )
