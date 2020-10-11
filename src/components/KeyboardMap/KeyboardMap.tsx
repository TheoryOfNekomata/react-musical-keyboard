import * as React from 'react'
import * as PropTypes from 'prop-types'
import reverseGetKeyFromPoint from '../../services/reverseGetKeyFromPoint'
import { MIDIMessageEvent } from '../../services/midi'
import { ORIENTATIONS } from '../../services/constants'

const propTypes = {
  /**
   * Ratio of the length of the accidental keys to the natural keys.
   */
  accidentalKeyLengthRatio: PropTypes.number,
  /**
   * Event handler triggered upon change in activated keys in the component.
   */
  onChange: PropTypes.func,
  /**
   * Map from key code to key number.
   */
  keyboardMapping: PropTypes.object,
  /**
   * Received velocity when activating the component through the keyboard.
   */
  keyboardVelocity: PropTypes.number,
  /**
   * MIDI input for sending MIDI messages to the component.
   */
  midiInput: PropTypes.shape({
    addEventListener: PropTypes.func.isRequired,
    removeEventListener: PropTypes.func.isRequired,
  }),
  /**
   * Orientation of the component.
   */
  orientation: PropTypes.oneOf(ORIENTATIONS),
  /**
   * Is the component mirrored?
   */
  mirrored: PropTypes.bool,
}

type Props = PropTypes.InferProps<typeof propTypes>

/**
 * Keyboard map for allowing interactivity with the keyboard.
 */
const KeyboardMap: React.FC<Props> = ({
  accidentalKeyLengthRatio,
  onChange,
  keyboardMapping = {},
  midiInput,
  keyboardVelocity = 0.75,
  orientation = 0,
  mirrored = false,
}) => {
  const baseRef = React.useRef<HTMLDivElement>(null)
  const keysOnRef = React.useRef<any[]>([])
  const lastVelocity = React.useRef<number | undefined>(undefined)

  const preventDefault: React.EventHandler<React.SyntheticEvent> = (e) => {
    e.preventDefault()
  }

  React.useEffect(() => {
    const baseRefCurrent = baseRef.current
    const handleMouseDown = (e: MouseEvent) => {
      if (baseRef.current === null) {
        return
      }
      if (baseRef.current.parentElement === null) {
        return
      }
      if (e.buttons !== 1) {
        return
      }
      e.preventDefault()
      const keyData = reverseGetKeyFromPoint(
        baseRef.current!.parentElement!,
        accidentalKeyLengthRatio!,
        orientation!,
        mirrored!,
      )(e.clientX, e.clientY)
      if (keyData! === null) {
        return
      }
      if (lastVelocity.current === undefined) {
        lastVelocity.current = keyData.velocity > 1 ? 1 : keyData.velocity < 0 ? 0 : keyData.velocity
      }
      keysOnRef.current = [...keysOnRef.current, { ...keyData, velocity: lastVelocity.current, id: -1 }]
      if (typeof onChange! === 'function') {
        onChange(keysOnRef.current)
      }
    }

    if (baseRefCurrent !== null) {
      baseRefCurrent.addEventListener('mousedown', handleMouseDown, { passive: false })
    }
    return () => {
      if (baseRefCurrent !== null) {
        baseRefCurrent.removeEventListener('mousedown', handleMouseDown)
      }
    }
  }, [accidentalKeyLengthRatio, onChange, orientation, mirrored])

  React.useEffect(() => {
    const baseRefCurrent = baseRef.current
    const handleTouchStart = (e: TouchEvent) => {
      if (baseRef.current === null) {
        return
      }
      if (baseRef.current.parentElement === null) {
        return
      }
      e.preventDefault()
      const touches = Array.from(e.changedTouches)
      const touchKeyData = touches.map<[React.Touch, { key: number; velocity: number } | null]>((t) => [
        t,
        reverseGetKeyFromPoint(
          baseRef.current!.parentElement!,
          accidentalKeyLengthRatio!,
          orientation!,
          mirrored!,
        )(t.clientX, t.clientY),
      ])
      const validTouchKeyData = touchKeyData.filter(([, keyData]) => keyData! !== null)
      validTouchKeyData.forEach(([t, keyData]) => {
        const theKeyData = keyData!
        if (lastVelocity.current === undefined) {
          lastVelocity.current = theKeyData.velocity > 1 ? 1 : theKeyData.velocity < 0 ? 0 : theKeyData.velocity
        }
        keysOnRef.current = [...keysOnRef.current, { ...keyData, velocity: lastVelocity.current, id: t.identifier }]
        if (typeof onChange! === 'function') {
          onChange(keysOnRef.current)
        }
      })
    }

    if (baseRefCurrent !== null) {
      baseRefCurrent.addEventListener('touchstart', handleTouchStart, { passive: false })
    }
    return () => {
      if (baseRefCurrent !== null) {
        baseRefCurrent.removeEventListener('touchstart', handleTouchStart)
      }
    }
  }, [accidentalKeyLengthRatio, onChange, orientation, mirrored])

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
        const keyData = reverseGetKeyFromPoint(
          baseRef.current!.parentElement!,
          accidentalKeyLengthRatio!,
          orientation!,
          mirrored!,
        )(t.clientX, t.clientY)
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
  }, [accidentalKeyLengthRatio, onChange, orientation, mirrored])

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (baseRef.current === null) {
        return
      }
      if (baseRef.current.parentElement === null) {
        return
      }
      if (e.buttons !== 1) {
        return
      }
      e.preventDefault()
      const keyData = reverseGetKeyFromPoint(
        baseRef.current!.parentElement,
        accidentalKeyLengthRatio!,
        orientation!,
        mirrored!,
      )(e.clientX, e.clientY)
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
          { ...keyData, velocity: lastVelocity.current, id: -1 },
        ]
        if (typeof onChange! === 'function') {
          onChange(keysOnRef.current)
        }
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [accidentalKeyLengthRatio, onChange, orientation, mirrored])

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
    window.addEventListener('touchcancel', handleTouchEnd)
    window.addEventListener('touchend', handleTouchEnd)
    return () => {
      window.removeEventListener('touchcancel', handleTouchEnd)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [onChange])

  React.useEffect(() => {
    const handleMouseUp = (e: MouseEvent) => {
      if (baseRef.current === null) {
        return
      }
      if (baseRef.current.parentElement === null) {
        return
      }
      e.preventDefault()
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
  }, [onChange])

  React.useEffect(() => {
    const baseRefComponent = baseRef.current
    const theKeyboardMapping = keyboardMapping as Record<string, number>
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!theKeyboardMapping) {
        return
      }
      if (e.ctrlKey || e.altKey || e.metaKey || e.shiftKey) {
        return
      }

      const { [e.code]: key = null } = theKeyboardMapping
      if (key === null) {
        return
      }
      if (keysOnRef.current.some((k) => k.key === key && k.id === -2)) {
        return
      }
      keysOnRef.current = [...keysOnRef.current, { key, velocity: keyboardVelocity, id: -2 }]
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
  }, [onChange, keyboardMapping, keyboardVelocity])

  React.useEffect(() => {
    const theKeyboardMapping = keyboardMapping as Record<string, number>
    const handleKeyUp = (e: KeyboardEvent) => {
      if (!theKeyboardMapping) {
        return
      }
      if (e.ctrlKey || e.altKey || e.metaKey || e.shiftKey) {
        return
      }

      const { [e.code]: key = null } = theKeyboardMapping

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
  }, [onChange, keyboardMapping])

  React.useEffect(() => {
    const handleMidiMessage = (e: MIDIMessageEvent) => {
      const arg0 = e.data[0]
      const arg1 = e.data[1]
      const arg2 = e.data[2]

      let key: number
      let velocity: number

      switch (arg0 & 0b11110000) {
        case 0b10010000: // Note On
          velocity = arg2 & 0b01111111
          key = arg1 & 0b01111111
          if (velocity > 0) {
            // some MIDI inputs set note off as simply note on with zero velocity
            keysOnRef.current = [
              ...keysOnRef.current,
              {
                key,
                velocity: velocity / 127,
                id: -3,
              },
            ]
          } else {
            keysOnRef.current = keysOnRef.current.filter((k) => k.key !== key)
          }
          if (typeof onChange! === 'function') {
            onChange(keysOnRef.current)
          }
          break
        case 0b10000000: // Note off
          key = arg1 & 0b01111111
          keysOnRef.current = keysOnRef.current.filter((k) => k.key !== key)
          if (typeof onChange! === 'function') {
            onChange(keysOnRef.current)
          }
          break
        default:
          return
      }
    }
    if (midiInput!) {
      midiInput!.addEventListener('midimessage', handleMidiMessage)
    }
    return () => {
      if (midiInput!) {
        midiInput!.removeEventListener('midimessage', handleMidiMessage)
      }
    }
  }, [midiInput, onChange])

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
        outline: 0,
        cursor: 'pointer',
      }}
      onContextMenu={preventDefault}
      onDragStart={preventDefault}
      tabIndex={0}
    />
  )
}

KeyboardMap.propTypes = propTypes

export default KeyboardMap
