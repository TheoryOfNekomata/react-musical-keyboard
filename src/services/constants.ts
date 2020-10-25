/*

                                              4
                            +-----------------------------------+
               3
 +--------------------------+

 *    *   *      * *        *   *    *     *  *       **
 +----+-----+----+-----+----+---+-----+----+-----+----+-----+---+
 |    |     |    |     |    |   |     |    |     |    |     |   |
 |    |     |    |     |    |   |     |    |     |    |     |   |
 |    |     |    |     |    |   |     |    |     |    |     |   |
 |    |     |    |     |    |   |     |    |     |    |     |   |
 |    |     |    |     |    |   |     |    |     |    |     |   |
 |    +---+-+    +-+---+    |   +----++    +--+--+    ++---++   |
 |        |        |        |        |        |        |        |
 |        |        |        |        |        |        |        |
 |        |        |        |        |        |        |        |
 +--------+--------+--------+--------+--------+--------+--------+

 */

// basic and naive
// export const KEY_OFFSETS = [
//   0, // C
//   3 / 7 / 5, // C#
//   1 / 7, // D
//   3 / 7 / 5 * 3, // D#
//   2 / 7, // E
//   3 / 7, // F
//   (3 / 7) + (4 / 7 / 7), // F#
//   4 / 7, // G
//   (3 / 7) + (4 / 7 / 7 * 3), // G#
//   5 / 7, // A
//   (3 / 7) + (4 / 7 / 7 * 5), // A#
//   6 / 7, // B
// ]

// http://datagenetics.com/blog/may32016/index.html
// export const KEY_OFFSETS = [
//   0, // C
//   525 / 5880, // C#
//   1 / 7, // D
//   (525 + 490 * 2) / 5880, // D#
//   2 / 7, // E
//   3 / 7, // F
//   (525 + 490 * 3 + 525 + 455) / 5880, // F#
//   4 / 7, // G
//   (525 + 490 * 5 + 525 + 455) / 5880, // G#
//   5 / 7, // A
//   (525 + 490 * 7 + 525 + 455) / 5880, // A#
//   6 / 7, // B
// ]

// pixel-perfect on smaller sizes
// export const KEY_OFFSETS = [
//   0,
//   14 / 140,
//   1 / 7,
//   36 / 140,
//   2 / 7,
//   3 / 7,
//   73 / 140,
//   4 / 7,
//   95 / 140,
//   5 / 7,
//   117 / 140,
//   6 / 7,
// ]

// compromise
export const KEY_OFFSETS = [
  0, // C
  (3 / 7 / 88) * 20, // C#
  1 / 7, // D
  (3 / 7 / 88) * 53, // D#
  2 / 7, // E
  3 / 7, // F
  3 / 7 + (4 / 7 / 56) * 9, // F#
  4 / 7, // G
  3 / 7 + (4 / 7 / 224) * 97, // G#
  5 / 7, // A
  3 / 7 + (4 / 7 / 112) * 79, // A#
  6 / 7, // B
]

export const ACCIDENTAL_KEY_TO_NATURAL_KEY_WIDTH_RATIO = 9 / 16

// export const ACCIDENTAL_KEY_TO_NATURAL_KEY_WIDTH_RATIO = 13 / 23

export const BEHAVIORS = ['link', 'checkbox', 'radio'] as const

export const OCTAVE_DIVISIONS = [12, 17, 19, 21, 24, 36] as const

export const ORIENTATIONS = [0, 90, 180, 270] as const

export const BOTTOM_CSS_ATTRIBUTES: Record<0 | 90 | 180 | 270, string> = {
  0: 'bottom',
  90: 'right',
  180: 'top',
  270: 'left',
}

export const LEFT_CSS_ATTRIBUTES: Record<0 | 90 | 180 | 270, string> = {
  0: 'left',
  90: 'bottom',
  180: 'right',
  270: 'top',
}

export const WIDTH_CSS_ATTRIBUTES: Record<0 | 90 | 180 | 270, string> = {
  0: 'width',
  180: 'width',
  90: 'height',
  270: 'height',
}

export const COMPONENTS: Record<string, string> = {
  link: 'a',
  checkbox: 'label',
  radio: 'label',
}
