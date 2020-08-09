import * as React from 'react'
import * as PropTypes from 'prop-types'
import keyPropTypes from '../../services/keyPropTypes'

const DEFAULT_COLOR = '#35313b'
const LIGHT_COLOR = 'white'

type Props = PropTypes.InferProps<typeof keyPropTypes>

const StyledAccidentalKey: React.FC<Props> = ({ keyChannels }) => {
  const hasKeyChannels = Array.isArray(keyChannels!) && keyChannels.length > 0
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        // @ts-ignore
        '--color-accidental-key': hasKeyChannels ? `var(--color-channel-${keyChannels![0]!.channel})` : undefined,
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          borderRadius: 'calc(1px * var(--size-scale-factor, 1))',
          boxShadow: '0 0 0 calc(1px * var(--size-scale-factor, 1)) rgba(0, 0, 0, 0.25)',
        }}
      />
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'black',
          position: 'absolute',
          top: 0,
          left: 0,
          borderRadius: '0 0 calc(1px * var(--size-scale-factor, 1)) calc(1px * var(--size-scale-factor, 1))',
        }}
      />
      <div
        style={{
          width: '100%',
          height: 'calc(6 / 50 * 100%)',
          padding: '0 calc(1px * var(--size-scale-factor, 1)) calc(1px * var(--size-scale-factor, 1))',
          boxSizing: 'border-box',
          position: 'absolute',
          bottom: 0,
          left: 0,
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '0 0 calc(1px * var(--size-scale-factor, 1)) calc(1px * var(--size-scale-factor, 1))',
            backgroundColor: `var(--color-accidental-key, ${DEFAULT_COLOR})`,
            maskImage: 'linear-gradient(to bottom, white, rgba(0, 0, 0, 0.9))',
            WebkitMaskImage: 'linear-gradient(to bottom, white, rgba(0, 0, 0, 0.9))',
            opacity: hasKeyChannels ? 0.75 : '1',
          }}
        />
      </div>
      <div
        style={{
          width: '100%',
          height: 'calc(44 / 50 * 100%)',
          padding: 'calc(1px * var(--size-scale-factor, 1)) calc(1px * var(--size-scale-factor, 1)) 0',
          boxSizing: 'border-box',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: `var(--color-accidental-key, ${DEFAULT_COLOR})`,
            opacity: hasKeyChannels ? 0.75 : '1',
          }}
        />
      </div>
      <div
        style={{
          width: '100%',
          height: 'calc(4px * var(--size-scale-factor, 1))',
          padding: 'calc(1px * var(--size-scale-factor, 1)) 0 0 0',
          boxSizing: 'border-box',
          position: 'absolute',
          top: 0,
          left: 0,
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
          width: 'calc(2px * var(--size-scale-factor, 1))',
          height: 'calc(10 / 52 * 100%)',
          padding: '0 calc(1px * var(--size-scale-factor, 1)) 0 0',
          boxSizing: 'border-box',
          position: 'absolute',
          top: 0,
          right: 0,
          opacity: hasKeyChannels ? 0.5 : '1',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: LIGHT_COLOR,
            maskImage: 'linear-gradient(to bottom, transparent, white)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, white)',
            opacity: '0.4',
          }}
        />
      </div>
      <div
        style={{
          width: 'calc(2px * var(--size-scale-factor, 1))',
          height: hasKeyChannels ? 'calc(38 / 52 * 100%)' : 'calc(34 / 52 * 100%)',
          boxSizing: 'border-box',
          position: 'absolute',
          bottom: hasKeyChannels ? 'calc(4 / 52 * 100%)' : 'calc(8 / 52 * 100%)',
          right: 0,
          paddingRight: 'calc(1px * var(--size-scale-factor, 1))',
          paddingLeft: 0,
          opacity: hasKeyChannels ? 0.5 : '1',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: LIGHT_COLOR,
            opacity: '0.4',
            borderBottomRightRadius: 'calc(1px * var(--size-scale-factor, 1))',
          }}
        />
      </div>
      <div
        style={{
          width: '100%',
          height: hasKeyChannels ? 'calc(2 / 52 * 100%)' : 'calc(6 / 52 * 100%)',
          padding:
            '0 calc(1px * var(--size-scale-factor, 1)) calc(1px * var(--size-scale-factor, 1)) calc(1px * var(--size-scale-factor, 1))',
          boxSizing: 'border-box',
          position: 'absolute',
          bottom: 0,
          left: 0,
          opacity: hasKeyChannels ? 3 : '4',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: LIGHT_COLOR,
            borderRadius:
              'calc(4px * var(--size-scale-factor, 1)) calc(4px * var(--size-scale-factor, 1)) calc(1px * var(--size-scale-factor, 1)) calc(1px * var(--size-scale-factor, 1))',
            opacity: '0.12',
          }}
        />
      </div>
      <div
        style={{
          width: '100%',
          height: hasKeyChannels ? 'calc(42 / 52 * 100%)' : 'calc(38 / 52 * 100%)',
          padding: '0 calc(3px * var(--size-scale-factor, 1)) 0 calc(3px * var(--size-scale-factor, 1))',
          boxSizing: 'border-box',
          position: 'absolute',
          top: 'calc(3px * var(--size-scale-factor, 1))',
          left: 0,
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: LIGHT_COLOR,
            maskImage: 'linear-gradient(to bottom, transparent, white)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, white)',
            borderRadius: 99999,
            opacity: hasKeyChannels ? 0.06 : '0.12',
          }}
        />
      </div>
      <div
        style={{
          width: '100%',
          paddingTop: 0,
          paddingRight: 'calc(1px * var(--size-scale-factor, 1))',
          paddingLeft: 'calc(2px * var(--size-scale-factor, 1))',
          boxSizing: 'border-box',
          position: 'absolute',
          bottom: hasKeyChannels ? 'calc(4 / 52 * 100%)' : 'calc(8 / 52 * 100%)',
          left: 0,
          height: 'calc(1px * var(--size-scale-factor, 1))',
          opacity: hasKeyChannels ? 0.5 : '1',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: LIGHT_COLOR,
            borderRadius: '0 0 calc(1px * var(--size-scale-factor, 1)) calc(1px * var(--size-scale-factor, 1))',
            opacity: '0.4',
          }}
        />
      </div>
    </div>
  )
}

StyledAccidentalKey.propTypes = keyPropTypes

export default StyledAccidentalKey
