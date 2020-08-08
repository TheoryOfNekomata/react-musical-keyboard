import * as React from 'react'
import * as ReactIs from 'react-is'
import StyledNaturalKey from './StyledNaturalKey'

it('should exist', () => {
  expect(StyledNaturalKey).toBeDefined()
})

it('should be a React component', () => {
  expect(ReactIs.isValidElementType(StyledNaturalKey)).toBe(true)
})

it('should render without crashing', () => {
  expect(() => <StyledNaturalKey />).not.toThrow()
})
