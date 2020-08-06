import * as fc from 'fast-check'
import isNaturalKey from './isNaturalKey'

it('should exist', () => {
  expect(isNaturalKey).toBeDefined()
})

it('should be a callable', () => {
  expect(typeof isNaturalKey).toBe('function')
})

it('should accept 1 parameter', () => {
  expect(isNaturalKey).toHaveLength(1)
})

it('should throw TypeError upon passing invalid types', () => {
  fc.assert(
    fc.property(
      fc.anything().filter(anything => typeof anything !== 'number'),
      anything => {
        expect(() => isNaturalKey(anything as number)).toThrowError(TypeError)
      }
    )
  )
})

it('should throw RangeError upon passing NaN', () => {
  expect(() => isNaturalKey(NaN)).toThrowError(RangeError)
})

it('should throw RangeError upon passing negative numbers', () => {
  fc.assert(
    fc.property(
      fc.anything().filter(anything => (
        typeof anything! === 'number'
        && !isNaN(anything)
        && anything < 0
      )),
      negativeValue => {
        expect(() => isNaturalKey(negativeValue as number)).toThrowError(RangeError)
      }
    )
  )
})

describe('upon passing a positive number or zero', () => {
  it('should not throw any error', () => {
    fc.assert(
      fc.property(
        fc.anything().filter(anything => (
          typeof anything! === 'number'
          && !isNaN(anything)
          && anything >= 0
        )),
        value => {
          expect(() => isNaturalKey(value as number)).not.toThrow()
        }
      )
    )
  })

  it('should return a boolean', () => {
    fc.assert(
      fc.property(
        fc.anything().filter(anything => (
          typeof anything! === 'number'
          && !isNaN(anything)
          && anything >= 0
        )),
        value => {
          expect(typeof isNaturalKey(value as number)).toBe('boolean')
        }
      )
    )
  })
})
