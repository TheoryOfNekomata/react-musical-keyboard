type ReverseGetKeyFromPoint = (
  baseElement: HTMLElement,
  accidentalKeyLengthRatio: number,
  orientation: number,
  mirrored: boolean,
) => (clientX: number, clientY?: number) => { key: number; velocity: number } | null

const reverseGetKeyFromPoint: ReverseGetKeyFromPoint = (
  baseElement,
  accidentalKeyLengthRatio,
  orientation,
  mirrored,
) => {
  const isRealTopFlipped = orientation === 180 || orientation === 270
  const isRealLeftFlipped = orientation === 90 || orientation === 180
  const isVertical = orientation === 90 || orientation === 270
  const { top, left, width, height } = baseElement.getBoundingClientRect()
  const realWidth = isVertical ? height : width
  const realHeight = isVertical ? width : height
  const realLeft = isVertical ? top : left
  const realTop = isVertical ? left : top
  return (clientX, clientY = top) => {
    const realClientX = isVertical ? clientY : clientX
    const realClientY = isVertical ? clientX : clientY
    const touchTop = isRealTopFlipped ? realHeight - realClientY + realTop : realClientY - realTop
    const touchLeft = mirrored
      ? isRealLeftFlipped
        ? realClientX - realLeft
        : realWidth - realClientX + realLeft
      : isRealLeftFlipped
      ? realWidth - realClientX + realLeft
      : realClientX - realLeft
    // convert the clientX to units in which keys are displayed (percentage)
    const leftInKeyUnits = (touchLeft / realWidth) * 100
    const maybeAccidental = touchTop <= realHeight * accidentalKeyLengthRatio!
    const keysArray = Array.from(baseElement.children) as HTMLElement[]
    const keys = keysArray.filter((c) => 'key' in c.dataset)
    const currentOctave = keys.filter((k) => {
      const octaveLeftBounds = Number(k.dataset.octaveLeftBounds)
      const octaveRightBounds = Number(k.dataset.octaveRightBounds)
      return octaveLeftBounds <= leftInKeyUnits && leftInKeyUnits < octaveRightBounds
    })
    const key: HTMLElement | undefined = currentOctave.reduce<HTMLElement | undefined>((selectedKey, octaveKey) => {
      if (maybeAccidental) {
        if (selectedKey !== undefined) {
          return selectedKey
        }
        const keyLeftBounds = Number(octaveKey.dataset.leftBounds)
        const keyRightBounds = Number(octaveKey.dataset.rightBounds)
        if (keyLeftBounds <= leftInKeyUnits && leftInKeyUnits < keyRightBounds) {
          return octaveKey
        }
        return selectedKey
      }

      if (selectedKey !== undefined) {
        return selectedKey
      }

      if (
        'leftFullBounds' in octaveKey.dataset &&
        'rightFullBounds' in octaveKey.dataset &&
        Number(octaveKey.dataset.leftFullBounds) <= leftInKeyUnits &&
        leftInKeyUnits < Number(octaveKey.dataset.rightFullBounds)
      ) {
        return octaveKey
      }
      return selectedKey
    }, undefined)
    if (key! === undefined) {
      return null
    }
    const { height: keyHeight } = key.getBoundingClientRect()
    return {
      velocity: touchTop / keyHeight,
      key: Number(key.dataset.key),
    }
  }
}

export default reverseGetKeyFromPoint
