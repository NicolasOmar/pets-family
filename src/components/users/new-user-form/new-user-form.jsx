import React from 'react'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
// GRAPHQL CLIENT
import { CREATE_USER } from '../../../graphql/mutations'
// COMPONENTS
import GridLayout from '../../shared/grid-layout/grid-layout'
import Form from '../../shared/form/form'
// FORM CONFIG
import {
  newUserFormInputs,
  newUserFormHeader,
  signUpButton,
  goToLoginButton
} from './new-user.config.json'
// CONSTANTS
import { ROUTES } from '../../../constants/routes.json'
// FUNCTIONS
import { encryptPass } from '../../../functions/encrypt'
import { setLoggedUser } from '../../../functions/local-storage'

const NewUserForm = () => {
  let history = useHistory()
  const [createUser, { loading, error }] = useMutation(CREATE_USER)

  const onSubmitCreation = async formData => {
    const newUser = {
      ...formData,
      password: encryptPass(formData.password)
    }

    createUser({
      variables: { newUser }
    })
      .then(({ data }) => {
        setLoggedUser(data.newUser)

        history.push(ROUTES.HOME)
      })
      .catch(error => console.error(error))
  }

  const onInputBlurChange = formData => {
    const isValid = formData.password.value === formData.repeatPassword.value

    return {
      ...formData,
      password: {
        ...formData.password,
        hasCustomValidation: true,
        isValid
      },
      repeatPassword: {
        ...formData.repeatPassword,
        hasCustomValidation: true,
        isValid
      }
    }
  }

  return (
    <GridLayout header={newUserFormHeader}>
      <Form
        isLoading={loading}
        errors={error}
        formObject={newUserFormInputs}
        formButtons={{
          signUpButton,
          goToLoginButton: {
            ...goToLoginButton,
            onClick: () => history.push(ROUTES.LOGIN)
          }
        }}
        onFormSubmit={data => onSubmitCreation(data)}
        onInputBlurChange={onInputBlurChange}
      />
    </GridLayout>
  )
}

export default NewUserForm
