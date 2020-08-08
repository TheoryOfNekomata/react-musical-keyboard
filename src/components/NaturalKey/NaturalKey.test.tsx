import * as React from 'react'
import * as ReactIs from 'react-is'
import NaturalKey from './NaturalKey'

it('should exist', () => {
  expect(NaturalKey).toBeDefined()
})

it('should be a React component', () => {
  expect(ReactIs.isValidElementType(NaturalKey)).toBe(true)
})

it('should render without crashing', () => {
  expect(() => <NaturalKey />).not.toThrow()
})
