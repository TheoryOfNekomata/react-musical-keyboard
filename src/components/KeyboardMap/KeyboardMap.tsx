import * as React from 'react'
import * as PropTypes from 'prop-types'
import reverseGetKeyFromPoint from '../../services/reverseGetKeyFromPoint'

const propTypes = {
  /**
   * Event handler triggered upon change in activated keys in the component.
   */
  onChange: PropTypes.func,
  /**
   * Map from key code to key number.
   */
  keyboardMapping: PropTypes.object,
  /**
   * Active MIDI channel for registering keys.
   */
  channel: PropTypes.number.isRequired,
}

type Props = PropTypes.InferProps<typeof propTypes> & { accidentalKeyLengthRatio?: number }

/**
 * Keyboard map for allowing interactivity with the keyboard.
 * @param channel - Active MIDI channel for registering keys.
 * @param accidentalKeyLengthRatio - Ratio of the length of the accidental keys to the natural keys. This is set by the Keyboard component.
 * @param onChange - Event handler triggered upon change in activated keys in the component.
 * @param keyboardMapping - Map from key code to key number.
 */
const KeyboardMap: React.FC<Props> = ({ channel, accidentalKeyLengthRatio, onChange, keyboardMapping = {} }) => {
  const baseRef = React.useRef<HTMLDivElement>(null)
  const keysOnRef = React.useRef<any[]>([])
  const lastVelocity = React.useRef<number | undefined>(undefined)
  const isTouch = React.useRef<boolean>(false)

  const handleContextMenu: React.EventHandler<any> = (e) => {
    e.preventDefault()
  }

  const handleDragStart: React.DragEventHandler = (e) => {
    e.preventDefault()
  }

  const handleMouseDown: React.MouseEventHandler = (e) => {
    if (isTouch.current) {
      return
    }
    if (baseRef.current === null) {
      return
    }
    if (baseRef.current.parentElement === null) {
      return
    }
    const keyData = reverseGetKeyFromPoint(baseRef.current!.parentElement!, accidentalKeyLengthRatio!)(
      e.clientX,
      e.clientY,
    )
    if (keyData! === null) {
      return
    }

    if (e.buttons === 1) {
      if (lastVelocity.current === undefined) {
        lastVelocity.current = keyData.velocity
      }
      keysOnRef.current = [...keysOnRef.current, { ...keyData, velocity: lastVelocity.current, channel, id: -1 }]
      if (typeof onChange! === 'function') {
        onChange(keysOnRef.current)
      }
    }
  }

  const handleTouchStart: React.TouchEventHandler = (e) => {
    isTouch.current = true
    if (baseRef.current === null) {
      return
    }
    if (baseRef.current.parentElement === null) {
      return
    }

    Array.from(e.changedTouches).forEach((t) => {
      const keyData = reverseGetKeyFromPoint(baseRef.current!.parentElement!, accidentalKeyLengthRatio!)(
        t.clientX,
        t.clientY,
      )
      if (keyData! === null) {
        return
      }
      if (lastVelocity.current === undefined) {
        lastVelocity.current = keyData.velocity
      }
      keysOnRef.current = [
        ...keysOnRef.current,
        { ...keyData, velocity: lastVelocity.current, channel, id: t.identifier },
      ]
      if (typeof onChange! === 'function') {
        onChange(keysOnRef.current)
      }
    })
  }

  React.useEffect(() => {
    const handleTouchMove = (e: TouchEvent) => {
      if (baseRef.current === null) {
        return
      }
      if (baseRef.current.parentElement === null) {
        return
      }

      e.preventDefault()

      Array.from(e.changedTouches).forEach((t) => {
        const keyData = reverseGetKeyFromPoint(baseRef.current!.parentElement!, accidentalKeyLengthRatio!)(
          t.clientX,
          t.clientY,
        )
        if (keyData! === null) {
          keysOnRef.current = keysOnRef.current.filter((k) => k.id !== t.identifier)
          if (typeof onChange! === 'function') {
            onChange(keysOnRef.current)
          }
          return
        }

        const [mouseKey = null] = keysOnRef.current.filter((k) => k.id === t.identifier)
        if (mouseKey === null) {
          keysOnRef.current = keysOnRef.current.filter((k) => k.id !== t.identifier)
          if (typeof onChange! === 'function') {
            onChange(keysOnRef.current)
          }
          return
        }
        if (mouseKey.key !== keyData.key) {
          keysOnRef.current = [
            ...keysOnRef.current.filter((k) => k.id !== t.identifier),
            {
              ...keyData,
              channel,
              velocity: lastVelocity.current,
              id: t.identifier,
            },
          ]
          if (typeof onChange! === 'function') {
            onChange(keysOnRef.current)
          }
        }
      })
    }

    window.addEventListener('touchmove', handleTouchMove, { passive: false })
    return () => {
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [accidentalKeyLengthRatio, channel, onChange])

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault()
      if (baseRef.current === null) {
        return
      }
      if (baseRef.current.parentElement === null) {
        return
      }

      if (e.buttons === 1) {
        const keyData = reverseGetKeyFromPoint(baseRef.current!.parentElement, accidentalKeyLengthRatio!)(
          e.clientX,
          e.clientY,
        )
        if (keyData! === null) {
          keysOnRef.current = keysOnRef.current.filter((k) => k.id !== -1)
          if (typeof onChange! === 'function') {
            onChange(keysOnRef.current)
          }
          return
        }

        const [mouseKey = null] = keysOnRef.current.filter((k) => k.id === -1)
        if (mouseKey === null) {
          keysOnRef.current = keysOnRef.current.filter((k) => k.id !== -1)
          if (typeof onChange! === 'function') {
            onChange(keysOnRef.current)
          }
          return
        }
        if (mouseKey.key !== keyData.key) {
          keysOnRef.current = [
            ...keysOnRef.current.filter((k) => k.id !== -1),
            { ...keyData, velocity: lastVelocity.current, channel, id: -1 },
          ]
          if (typeof onChange! === 'function') {
            onChange(keysOnRef.current)
          }
        }
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [accidentalKeyLengthRatio, channel, onChange])

  React.useEffect(() => {
    const handleTouchEnd = (e: TouchEvent) => {
      if (baseRef.current === null) {
        return
      }
      if (baseRef.current.parentElement === null) {
        return
      }
      Array.from(e.changedTouches).forEach((t) => {
        keysOnRef.current = keysOnRef.current.filter((k) => k.id !== t.identifier)
        lastVelocity.current = undefined
        if (typeof onChange! === 'function') {
          onChange(keysOnRef.current)
        }
      })
    }
    window.addEventListener('touchend', handleTouchEnd)
    return () => {
      window.removeEventListener('touchend', handleTouchEnd)
    }
  })

  React.useEffect(() => {
    const handleMouseUp = (e: MouseEvent) => {
      e.preventDefault()
      if (baseRef.current === null) {
        return
      }
      if (baseRef.current.parentElement === null) {
        return
      }
      keysOnRef.current = keysOnRef.current.filter((k) => k.id !== -1)
      lastVelocity.current = undefined
      if (typeof onChange! === 'function') {
        onChange(keysOnRef.current)
      }
    }

    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [accidentalKeyLengthRatio, channel, onChange])

  React.useEffect(() => {
    const baseRefComponent = baseRef.current
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!keyboardMapping!) {
        return
      }

      const { [e.code]: key = null } = keyboardMapping as Record<string, number>

      if (key === null) {
        return
      }

      if (keysOnRef.current.some((k) => k.key === key && k.id === -2)) {
        return
      }
      keysOnRef.current = [...keysOnRef.current, { key, velocity: 0.75, channel, id: -2 }]
      if (typeof onChange! === 'function') {
        onChange(keysOnRef.current)
      }
    }

    if (baseRefComponent) {
      baseRefComponent.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      if (baseRefComponent) {
        baseRefComponent.removeEventListener('keydown', handleKeyDown)
      }
    }
  })

  React.useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (!keyboardMapping!) {
        return
      }

      const { [e.code]: key = null } = keyboardMapping as Record<string, number>

      if (key === null) {
        return
      }

      keysOnRef.current = keysOnRef.current.filter((k) => k.key !== key)
      if (typeof onChange! === 'function') {
        onChange(keysOnRef.current)
      }
    }

    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keyup', handleKeyUp)
    }
  })

  return (
    <div
      ref={baseRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 4,
      }}
      onContextMenu={handleContextMenu}
      onDragStart={handleDragStart}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      tabIndex={0}
    />
  )
}

KeyboardMap.propTypes = propTypes

export default KeyboardMap
