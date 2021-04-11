import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
// COMPONENTS
import GridLayout from '../../shared/grid-layout/grid-layout'
import FormInput from '../../shared/form-input/form-input'
import FormButton from '../../shared/form-button/form-button'
// API
import USERSAPI from '../../../api/users.api'
// MODELS
import {
  loginForm,
  loginFormHeader,
  loginButton,
  goToSignUpButton
} from '../../../configs/login.configs'
// CONSTANTS
import ROUTES from '../../../constants/app-routes'
// HELPERS
import { encryptPass } from '../../../helpers/encrypt'
import { getLoggedUser, setLoggedUser } from '../../../helpers/local-storage'
import { checkEmptyValues, checkFormValidation } from '../../../helpers/methods'
import Form from '../../shared/form/form'

const LoginForm = () => {
  let history = useHistory()
  const [formObject, setFormObject] = useState(loginForm)
  const [isLoading, setIsLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    getLoggedUser() && history.push(ROUTES.HOME)
    return () => {}
  }, [history])

  useEffect(() => {
    const hasEmptyValues = checkEmptyValues(formObject)
    const isValidForm = checkFormValidation(formObject)

    setHasErrors(!isValidForm || !hasEmptyValues)
    !isValidForm && setErrorMsg('The form needs to fill required fields')
    return () => {}
  }, [formObject])

  const onInputChange = (evt, prop) => {
    const { value } = evt.target
    const isValidValue = value && value !== ''

    setFormObject({
      ...formObject,
      [prop]: {
        ...formObject[prop],
        value: isValidValue ? value : null
      }
    })
  }

  const onSubmitLogin = async () => {
    if (hasErrors) {
      return
    }
    setIsLoading(true)

    const payload = {
      email: formObject.email.value,
      password: encryptPass(formObject.password.value)
    }
    const { data, message } = await USERSAPI.LOGIN(payload)

    setIsLoading(false)

    if (data) {
      setLoggedUser({
        token: data.token,
        ...data.userLogged
      })

      history.push(ROUTES.HOME)
    } else {
      setHasErrors(true)
      setErrorMsg(message)
    }
  }

  const checkValidation = prop => {
    const { value, isRequired } = formObject[prop]

    setFormObject({
      ...formObject,
      [prop]: {
        ...formObject[prop],
        valid: isRequired ? value && value !== '' : true
      }
    })
  }

  // const renderErrorMsg = () => {
  //   return hasErrors && errorMsg ? <Message error header="Oops" content={errorMsg} /> : null
  // }

  return (
    <GridLayout header={loginFormHeader}>
      <Form
        formObject={formObject}
        formButtons={[
          loginButton,
          {
            ...goToSignUpButton,
            onClick: () => history.push(ROUTES.NEW_USER)
          }
        ]}
      />
    </GridLayout>
  )
}

export default LoginForm