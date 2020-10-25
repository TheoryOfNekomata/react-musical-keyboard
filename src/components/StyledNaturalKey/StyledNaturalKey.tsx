import * as React from 'react'
import * as PropTypes from 'prop-types'
import {
  BOTTOM_CSS_ATTRIBUTES,
  LEFT_CSS_ATTRIBUTES,
  WIDTH_CSS_ATTRIBUTES,
  ORIENTATIONS,
} from '../../services/constants'

const LIGHT_COLOR = 'white'

const propTypes = {
  label: PropTypes.string,
  orientation: PropTypes.oneOf(ORIENTATIONS),
}

type Props = PropTypes.InferProps<typeof propTypes>

const StyledNaturalKey: React.FC<Props> = ({ label = '', orientation = 0 }) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      position: 'relative',
    }}
  >
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
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
              backgroundColor: `var(--color-natural-key, #e3e3e5)`,
              borderRadius: '0 0 calc(1px * var(--size-scale-factor, 1)) calc(1px * var(--size-scale-factor, 1))',
              opacity: 1,
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
            backgroundColor: LIGHT_COLOR,
            opacity: 0.25,
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
            height: 'calc(3px * var(--size-scale-factor, 1))',
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
    </div>
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 'var(--opacity-highlight)',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
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
              backgroundColor: `var(--color-active-key, Highlight)`,
              borderRadius: '0 0 calc(1px * var(--size-scale-factor, 1)) calc(1px * var(--size-scale-factor, 1))',
              opacity: 0.75,
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
            backgroundColor: LIGHT_COLOR,
            opacity: 0.12,
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
            height: 'calc(4px * var(--size-scale-factor, 1))',
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
    </div>
    <div
      style={{
        position: 'absolute',
        display: 'grid',
        placeContent: 'center',
        [BOTTOM_CSS_ATTRIBUTES[orientation || 0]]: 0,
        [LEFT_CSS_ATTRIBUTES[orientation || 0]]: 0,
        [WIDTH_CSS_ATTRIBUTES[orientation || 0]]: '100%',
      }}
    >
      {label}
    </div>
  </div>
)

export default StyledNaturalKey
