import * as React from 'react'
import * as ReactIs from 'react-is'
import Keyboard from './Keyboard'

it('should exist', () => {
  expect(Keyboard).toBeDefined()
})

it('should be a React component', () => {
  expect(ReactIs.isValidElementType(Keyboard)).toBe(true)
})

it('should render without crashing', () => {
  expect(() => <Keyboard startKey={21} endKey={108} />).not.toThrow()
})
