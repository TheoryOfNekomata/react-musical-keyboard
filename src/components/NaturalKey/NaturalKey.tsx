import * as React from 'react'

const NaturalKey: React.FC = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      backgroundColor: 'var(--color-natural-key, white)',
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
  </div>
)

export default NaturalKey
