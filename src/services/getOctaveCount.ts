interface GetOctaveCount {
  (startKey: number, endKey: number): number
}

const getOctaveCount: GetOctaveCount = (startKey, endKey) => {
  const startOctave = Math.floor(startKey / 12)
  const endOctave = Math.floor(endKey / 12)
  return endOctave - startOctave + 1
}

export default getOctaveCount
