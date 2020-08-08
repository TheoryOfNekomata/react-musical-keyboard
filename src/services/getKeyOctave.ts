interface GetKeyOctave {
  (k: number): number
}

const getKeyOctave: GetKeyOctave = (k) => Math.floor(k / 12)

export default getKeyOctave
