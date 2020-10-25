import * as React from 'react'
import * as PropTypes from 'prop-types'
import {
  BOTTOM_CSS_ATTRIBUTES,
  LEFT_CSS_ATTRIBUTES,
  WIDTH_CSS_ATTRIBUTES,
  ORIENTATIONS,
} from '../../services/constants'

const propTypes = {
  label: PropTypes.string,
  orientation: PropTypes.oneOf(ORIENTATIONS),
}

type Props = PropTypes.InferProps<typeof propTypes>

const AccidentalKey: React.FC<Props> = ({ label = '', orientation = 0 }) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      backgroundColor: 'var(--color-accidental-key, black)',
      border: '1px solid',
      boxSizing: 'border-box',
      position: 'relative',
    }}
  >
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        opacity: 'var(--opacity-highlight)',
        backgroundColor: `var(--color-active-key, Highlight)`,
      }}
    />
    <div
      style={{
        position: 'absolute',
        display: 'grid',
        placeContent: 'center',
        filter: 'invert(100)',
        [BOTTOM_CSS_ATTRIBUTES[orientation || 0]]: 0,
        [LEFT_CSS_ATTRIBUTES[orientation || 0]]: 0,
        [WIDTH_CSS_ATTRIBUTES[orientation || 0]]: '100%',
      }}
    >
      {label}
    </div>
  </div>
)

export default AccidentalKey
