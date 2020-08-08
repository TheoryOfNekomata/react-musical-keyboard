import * as React from 'react'
import * as ReactIs from 'react-is'
import AccidentalKey from './AccidentalKey'

it('should exist', () => {
  expect(AccidentalKey).toBeDefined()
})

it('should be a React component', () => {
  expect(ReactIs.isValidElementType(AccidentalKey)).toBe(true)
})

it('should render without crashing', () => {
  expect(() => <AccidentalKey />).not.toThrow()
})
