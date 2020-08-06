const NATURAL_KEYS = [0, 2, 4, 5, 7, 9, 11]

export default (k: number): boolean => {
  const type = typeof (k as unknown)
  if (type as string !== 'number') {
    throw TypeError(`Invalid value type passed to isNaturalKey, expected 'number', got ${type}.`)
  }
  if (isNaN(k)) {
    throw RangeError('Value passed is NaN.')
  }
  if (k < 0) {
    throw RangeError('Value must be positive.')
  }
  return NATURAL_KEYS.includes(Math.floor(k) % 12)
}
