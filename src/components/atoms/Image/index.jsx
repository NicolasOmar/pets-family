import React from 'react'
import PropTypes from 'prop-types'
// CONSTANTS
import BULMA_STYLES from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseObjKeys } from '../../../functions/parsers'

const { imageRatios } = BULMA_STYLES

const Image = ({ src, altText, styles = {}, fixedRatio, ratio, isRounded = false }) => {
  const figureClass = Number.isInteger(fixedRatio)
    ? `image is-${fixedRatio}x${fixedRatio}`
    : imageRatios[ratio]
    ? `image ${imageRatios[ratio]}`
    : 'image'
  const imgClass = isRounded ? 'is-rounded' : ''
  const testId = altText.toLowerCase().replace(' ', '-')

  return (
    <figure data-testid={testId} className={figureClass} style={styles}>
      <img src={src} alt={altText} className={imgClass} />
    </figure>
  )
}

export default Image

Image.propTypes = {
  // BASE IMG PROPS
  src: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  // STYLE PROPS
  styles: PropTypes.object,
  fixedRatio: PropTypes.number,
  ratio: PropTypes.oneOf(parseObjKeys(imageRatios)),
  isRounded: PropTypes.bool
}
