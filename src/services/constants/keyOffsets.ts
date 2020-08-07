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

// export default [
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
export default [
  0, // C
  525 / 5880, // C#
  1 / 7, // D
  (525 + 490 * 2) / 5880, // D#
  2 / 7, // E
  3 / 7, // F
  (525 + 490 * 3 + 525 + 455) / 5880, // F#
  4 / 7, // G
  (525 + 490 * 5 + 525 + 455) / 5880, // G#
  5 / 7, // A
  (525 + 490 * 7 + 525 + 455) / 5880, // A#
  6 / 7, // B
]
