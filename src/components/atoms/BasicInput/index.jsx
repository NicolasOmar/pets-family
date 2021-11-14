import React from 'react'
import { bool, func, string, number, oneOf } from 'prop-types'
// CONSTANTS
import { inputTypes } from 'constants/tag-types.json'
import { colors, sizes } from 'constants/bulma-styles.json'
// FUNCTIONS
import { parseCssClasses, parseObjKeys } from 'functions/parsers'

const BasicInput = ({
  type,
  control,
  value = '',
  color = parseObjKeys(colors)[0],
  size = parseObjKeys(sizes)[0],
  isRounded = false,
  placeHolder = null,
  onInputChange,
  onBlurChange,
  isRequired = false,
  isDisabled = false,
  minLength = null,
  maxLength = null
}) => {
  const inputClass = parseCssClasses({ isRounded }, 'input', [colors[color], sizes[size]])
  return (
    <input
      data-testid={`${control}-${type}`}
      type={type}
      className={inputClass}
      value={value}
      placeholder={placeHolder}
      required={isRequired}
      disabled={isDisabled}
      onChange={evt => onInputChange(evt, control)}
      onBlur={() => onBlurChange(control)}
      name={control.toLowerCase().replace(' ', '-')}
      minLength={minLength}
      maxLength={maxLength}
    />
  )
}

export default BasicInput

BasicInput.propTypes = {
  type: oneOf(inputTypes).isRequired,
  control: string.isRequired,
  value: string,
  color: oneOf(parseObjKeys(colors)),
  size: oneOf(parseObjKeys(sizes)),
  isRounded: bool,
  placeHolder: string,
  onInputChange: func,
  onBlurChange: func,
  isRequired: bool,
  isDisabled: bool,
  minLength: number,
  maxLength: number
}
