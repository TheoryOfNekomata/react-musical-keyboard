type ReverseGetKeyFromPoint = (
  baseElement: HTMLElement,
  accidentalKeyLengthRatio: number,
) => (clientX: number, clientY?: number) => { key: number; velocity: number } | null

const reverseGetKeyFromPoint: ReverseGetKeyFromPoint = (baseElement, accidentalKeyLengthRatio) => {
  const { top, left, width, height } = baseElement.getBoundingClientRect()
  return (clientX, clientY = top) => {
    const realTop = clientY - top
    const realLeft = clientX - left
    // convert the clientX to units in which keys are displayed (percentage)
    const leftInKeyUnits = (realLeft / width) * 100
    const maybeAccidental = realTop <= height * accidentalKeyLengthRatio!
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
      velocity: realTop / keyHeight,
      key: Number(key.dataset.key),
    }
  }
}

export default reverseGetKeyFromPoint
