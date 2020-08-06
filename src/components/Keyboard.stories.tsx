import * as React from 'react'
import * as PropTypes from 'prop-types'
import Keyboard, { propTypes, } from './Keyboard'

export default {
  title: 'Keyboard',
}

type Props = PropTypes.InferProps<typeof propTypes>

// By passing optional props to this story, you can control the props of the component when
// you consume the story in a test.
export const Default = (props?: Partial<Props>) => <Keyboard {...props} />;
