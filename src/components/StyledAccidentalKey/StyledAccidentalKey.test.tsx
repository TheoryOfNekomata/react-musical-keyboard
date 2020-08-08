import * as React from 'react'
import * as ReactIs from 'react-is'
import StyledAccidentalKey from './StyledAccidentalKey'

it('should exist', () => {
  expect(StyledAccidentalKey).toBeDefined()
})

it('should be a React component', () => {
  expect(ReactIs.isValidElementType(StyledAccidentalKey)).toBe(true)
})

it('should render without crashing', () => {
  expect(() => <StyledAccidentalKey />).not.toThrow()
})
