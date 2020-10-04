import * as React from 'react'

const LIGHT_COLOR = 'white'

const StyledAccidentalKey: React.FC = () => {
  return (
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
                backgroundColor: `var(--color-accidental-key, #35313b)`,
                maskImage: 'linear-gradient(to bottom, white, rgba(0, 0, 0, 0.9))',
                WebkitMaskImage: 'linear-gradient(to bottom, white, rgba(0, 0, 0, 0.9))',
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
                backgroundColor: `var(--color-accidental-key, #35313b)`,
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
              height: 'calc(34 / 52 * 100%)',
              boxSizing: 'border-box',
              position: 'absolute',
              bottom: 'calc(8 / 52 * 100%)',
              right: 0,
              paddingRight: 'calc(1px * var(--size-scale-factor, 1))',
              paddingLeft: 0,
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
              height: 'calc(6 / 52 * 100%)',
              padding:
                '0 calc(1px * var(--size-scale-factor, 1)) calc(1px * var(--size-scale-factor, 1)) calc(1px * var(--size-scale-factor, 1))',
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
              height: 'calc(38 / 52 * 100%)',
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
                opacity: 0.12,
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
              bottom: 'calc(8 / 52 * 100%)',
              left: 0,
              height: 'calc(1px * var(--size-scale-factor, 1))',
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
                backgroundColor: 'var(--color-active-key, Highlight)',
                maskImage: 'linear-gradient(to bottom, white, rgba(0, 0, 0, 0.9))',
                WebkitMaskImage: 'linear-gradient(to bottom, white, rgba(0, 0, 0, 0.9))',
                opacity: 0.75,
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
                backgroundColor: 'var(--color-active-key, Highlight)',
                opacity: 0.75,
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
              opacity: 0.5,
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
              height: 'calc(38 / 52 * 100%)',
              boxSizing: 'border-box',
              position: 'absolute',
              bottom: 'calc(4 / 52 * 100%)',
              right: 0,
              paddingRight: 'calc(1px * var(--size-scale-factor, 1))',
              paddingLeft: 0,
              opacity: 0.5,
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
              height: 'calc(2 / 52 * 100%)',
              padding:
                '0 calc(1px * var(--size-scale-factor, 1)) calc(1px * var(--size-scale-factor, 1)) calc(1px * var(--size-scale-factor, 1))',
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
              height: 'calc(42 / 52 * 100%)',
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
                opacity: 0.06,
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
              bottom: 'calc(4 / 52 * 100%)',
              left: 0,
              height: 'calc(1px * var(--size-scale-factor, 1))',
              opacity: 0.5,
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
      </div>
    </div>
  )
}

export default StyledAccidentalKey
