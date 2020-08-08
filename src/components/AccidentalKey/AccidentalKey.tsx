import * as React from 'react'
import * as PropTypes from 'prop-types'
import keyPropTypes from '../../services/keyPropTypes'

type Props = PropTypes.InferProps<typeof keyPropTypes>

const AccidentalKey: React.FC<Props> = ({ keyChannels }) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      backgroundColor: 'var(--color-accidental-key, currentColor)',
      border: '1px solid',
      boxSizing: 'border-box',
      position: 'relative',
    }}
  >
    {Array.isArray(keyChannels!) &&
      keyChannels.map((c) => (
        <div
          key={c!.channel}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: 0.75,
            backgroundColor: `var(--color-channel-${c!.channel}, Highlight)`,
          }}
        />
      ))}
  </div>
)

AccidentalKey.propTypes = keyPropTypes

export default AccidentalKey
