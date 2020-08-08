import * as React from 'react'
import * as PropTypes from 'prop-types'
import keyPropTypes from '../../services/keyPropTypes'

const DEFAULT_COLOR = '#e3e3e5'
const LIGHT_COLOR = 'white'

type Props = PropTypes.InferProps<typeof keyPropTypes>

const StyledNaturalKey: React.FC<Props> = ({ keyChannels }) => {
  const hasKeyChannels = Array.isArray(keyChannels!) && keyChannels.length > 0
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        // @ts-ignore
        '--color-natural-key': hasKeyChannels ? `var(--color-channel-${keyChannels![0]!.channel})` : undefined,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'black',
          position: 'absolute',
          top: '0',
          left: '0',
        }}
      />
      <div
        style={{
          width: '100%',
          height: '100%',
          padding:
            'calc(1px * var(--size-scale-factor, 1)) 0 calc(1px * var(--size-scale-factor, 1)) calc(1px * var(--size-scale-factor, 1))',
          boxSizing: 'border-box',
          position: 'absolute',
          top: '0',
          left: '0',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: `var(--color-natural-key, ${DEFAULT_COLOR})`,
            borderRadius: '0 0 calc(1px * var(--size-scale-factor, 1)) calc(1px * var(--size-scale-factor, 1))',
            opacity: hasKeyChannels ? 0.75 : 1,
          }}
        />
      </div>
      <div
        style={{
          width: '100%',
          height: 'calc(33 / 80 * 100%)',
          padding:
            '0 calc(1px * var(--size-scale-factor, 1)) calc(2px * var(--size-scale-factor, 1)) calc(2px * var(--size-scale-factor, 1))',
          boxSizing: 'border-box',
          backgroundClip: 'content-box',
          position: 'absolute',
          bottom: '0',
          left: '0',
          maskImage: 'linear-gradient(to bottom, transparent, white)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, white)',
          backgroundColor: hasKeyChannels ? 'black' : LIGHT_COLOR,
          opacity: hasKeyChannels ? 0.12 : 0.25,
        }}
      />
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'black',
          padding:
            'calc(1px * var(--size-scale-factor, 1)) calc(2px * var(--size-scale-factor, 1)) calc(3px * var(--size-scale-factor, 1)) calc(3px * var(--size-scale-factor, 1))',
          boxSizing: 'border-box',
          backgroundClip: 'content-box',
          position: 'absolute',
          bottom: '0',
          left: '0',
          opacity: '0.08',
          maskImage: 'linear-gradient(to bottom, transparent, white)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, white)',
        }}
      />
      <div
        style={{
          width: '100%',
          height: 'calc(2px * var(--size-scale-factor, 1))',
          padding: '0 0 calc(1px * var(--size-scale-factor, 1)) calc(1px * var(--size-scale-factor, 1))',
          boxSizing: 'border-box',
          position: 'absolute',
          bottom: '0',
          left: '0',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'black',
            borderRadius: '0 0 calc(1px * var(--size-scale-factor, 1)) calc(1px * var(--size-scale-factor, 1))',
            opacity: '0.25',
          }}
        />
      </div>
      <div
        style={{
          width: 'calc(2px * var(--size-scale-factor, 1))',
          height: '100%',
          padding:
            'calc(1px * var(--size-scale-factor, 1)) 0 calc(1px * var(--size-scale-factor, 1)) calc(1px * var(--size-scale-factor, 1))',
          boxSizing: 'border-box',
          position: 'absolute',
          bottom: '0',
          left: '0',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'black',
            borderRadius: '0 0 0 calc(1px * var(--size-scale-factor, 1))',
            opacity: '0.07',
          }}
        />
      </div>
      <div
        style={{
          width: '100%',
          height: 'calc(6px * var(--size-scale-factor, 1))',
          padding: 'calc(1px * var(--size-scale-factor, 1)) 0 0 calc(1px * var(--size-scale-factor, 1))',
          boxSizing: 'border-box',
          position: 'absolute',
          top: '0',
          left: '0',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'black',
            maskImage: 'linear-gradient(to bottom, white, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, white, transparent)',
            opacity: '0.12',
          }}
        />
      </div>
      <div
        style={{
          width: '100%',
          padding: 'calc(1px * var(--size-scale-factor, 1)) 0 0 calc(1px * var(--size-scale-factor, 1))',
          boxSizing: 'border-box',
          position: 'absolute',
          top: '0',
          left: '0',
          height: hasKeyChannels
            ? 'calc(4px * var(--size-scale-factor, 1))'
            : 'calc(3px * var(--size-scale-factor, 1))',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'black',
            opacity: '0.12',
          }}
        />
      </div>
      <div
        style={{
          width: 'calc(1px * var(--size-scale-factor, 1))',
          height: '100%',
          padding: 'calc(1px * var(--size-scale-factor, 1)) 0 calc(1px * var(--size-scale-factor, 1)) 0',
          boxSizing: 'border-box',
          position: 'absolute',
          bottom: '0',
          right: '0',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: LIGHT_COLOR,
            borderRadius: '0 0 calc(1px * var(--size-scale-factor, 1)) 0',
            opacity: '0.12',
          }}
        />
      </div>
    </div>
  )
}

StyledNaturalKey.propTypes = keyPropTypes

export default StyledNaturalKey
