import React from 'react'
import { useHistory } from 'react-router-dom'
import { string } from 'prop-types'
import { useDispatch } from 'react-redux'
// GRAPHQL CLIENT
import { useMutation } from '@apollo/client'
import { LOGOUT } from '../../../graphql/mutations'
// COMPONENTS
import NavBar from '../../organisms/NavBar'
// CONSTANTS
import { APP_ROUTES } from '../../../constants/routes.json'
// FUNCTIONS
import { clearAllStorage } from '../../../functions/local-storage'

const UserHeader = ({ name }) => {
  let history = useHistory()
  const [logout] = useMutation(LOGOUT)
  const dispatch = useDispatch()

  const onLogout = async () => {
    try {
      logout().then(() => {
        clearAllStorage()
        dispatch({
          type: 'LOGOUT',
          payload: null
        })
        history.push(APP_ROUTES.LOGIN)
      })
    } catch (e) {
      console.warn('e', e)
    }
  }

  const dropdownConfig = {
    end: [
      {
        type: 'dropdown',
        label: name.toUpperCase(),
        options: [
          {
            itemLabel: 'Update User',
            onClickItem: () => history.push(APP_ROUTES.UPDATE_USER)
          },
          {
            itemLabel: 'Update Pass',
            onClickItem: () => history.push(APP_ROUTES.UPDATE_PASS)
          },
          {
            itemLabel: 'Logout',
            onClickItem: onLogout
          }
        ]
      }
    ]
  }

  return <NavBar {...dropdownConfig} />
}

export default UserHeader

UserHeader.propTypes = {
  name: string.isRequired
}
