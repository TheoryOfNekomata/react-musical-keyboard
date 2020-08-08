import * as PropTypes from 'prop-types'

export default {
  keyChannels: PropTypes.arrayOf(
    PropTypes.shape({
      channel: PropTypes.number.isRequired,
      key: PropTypes.number.isRequired,
      velocity: PropTypes.number.isRequired,
    }),
  ),
}
