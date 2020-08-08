import * as React from 'react'
import * as PropTypes from 'prop-types'
import styled from 'styled-components'
import keyPropTypes from '../../services/keyPropTypes'

const Base = styled('div')({
  width: '100%',
  height: '100%',
  backgroundColor: 'var(--color-natural-key, white)',
  border: '1px solid',
  boxSizing: 'border-box',
  position: 'relative',
})

const Highlight = styled('div')({
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  opacity: 0.75,
})

type Props = PropTypes.InferProps<typeof keyPropTypes>

const NaturalKey: React.FC<Props> = ({ keyChannels }) => (
  <Base>
    {Array.isArray(keyChannels!) &&
      keyChannels.map((c) => (
        <Highlight
          key={c!.channel}
          style={{
            backgroundColor: `var(--color-channel-${c!.channel}, Highlight)`,
          }}
        />
      ))}
  </Base>
)

NaturalKey.propTypes = keyPropTypes

export default NaturalKey
