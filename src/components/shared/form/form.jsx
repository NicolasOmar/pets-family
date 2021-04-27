import React, { useState } from 'react'
import { bool, func, object } from 'prop-types'
import './form.scss'
// COMPONENTS
import FormInput from '../../shared/form-input/form-input'
import FormButton from '../form-button/form-button'
// HELPERS FUNCTIONS
import { sendObjValues } from '../../../functions/methods'

const Form = ({ isLoading, formObject, formButtons, onFormSubmit }) => {
  const [formControls, setFormControls] = useState(formObject)
  const formClass = `ui form ${isLoading || false}`

  const onInputChange = (evt, prop) => {
    const { value } = evt.target
    const isValidValue = value && value !== ''

    setFormControls({
      ...formControls,
      [prop]: {
        ...formControls[prop],
        value: isValidValue ? value : null
      }
    })
  }

  const onSubmit = evt => {
    evt.preventDefault()

    onFormSubmit(sendObjValues(formControls))
  }

  // const checkValidation = prop => {
  //   const { value, isRequired } = formControls[prop]

  //   setFormControls({
  //     ...formControls,
  //     [prop]: {
  //       ...formControls[prop],
  //       valid: isRequired ? value && value !== '' : true
  //     }
  //   })
  // }

  return (
    <div className="ui segment">
      <form className={formClass} onSubmit={onSubmit}>
        {Object.keys(formControls).map((prop, i) => {
          return (
            <FormInput
              key={`${prop}-${i}`}
              config={{
                ...formControls[prop],
                onInputChange,
                onBlurChange: () => {}
              }}
            />
          )
        })}
        {formButtons &&
          Object.keys(formButtons).map((prop, i) => {
            return (
              <FormButton
                key={`${prop}-${i}`}
                config={{
                  ...formButtons[prop]
                  // onInputChange,
                  // onBlurChange: checkValidation
                }}
              />
            )
          })}
      </form>
    </div>
  )
}

export default Form

Form.propTypes = {
  isLoading: bool,
  formObject: object,
  formButtons: object,
  onFormSubmit: func
}
