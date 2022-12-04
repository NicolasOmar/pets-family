import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { string } from 'prop-types'
import { useDispatch } from 'react-redux'
// GRAPHQL CLIENT
import { useMutation } from '@apollo/client'
import { LOGOUT } from '../../../graphql/mutations'
// COMPONENTS
import NavBar from '../../organisms/NavBar'
// CONSTANTS
import ROUTES from '../../../constants/routes.json'
// FUNCTIONS
import { clearAllStorage, getStorage, setStorage } from '../../../functions/local-storage'

const { APP_ROUTES } = ROUTES

const UserHeader = ({ name }) => {
  let navigate = useNavigate()
  const [logout] = useMutation(LOGOUT)
  const dispatch = useDispatch()
  const isDarkModeOs = window.matchMedia('(prefers-color-scheme: dark)').matches
  const [isDarkModeApp, setIsDarkModeApp] = useState(getStorage('isDarkMode') ?? isDarkModeOs)

  useEffect(() => {
    const appStyle = getStorage('isDarkMode') ?? isDarkModeOs ? 'dark-mode' : 'light-mode'
    document.body.classList.toggle(appStyle)
  }, [isDarkModeOs])

  const onLogout = async () => {
    try {
      await logout()
      clearAllStorage()
      dispatch({
        type: 'LOGOUT',
        payload: null
      })
      navigate(APP_ROUTES.LOGIN)
    } catch (e) {
      console.warn('e', e)
    }
  }

  const toggleStyle = () => {
    const inverseAppStyle = isDarkModeOs ? 'light-mode' : 'dark-mode'
    document.body.classList.toggle(inverseAppStyle)
    setIsDarkModeApp(!isDarkModeApp)
    setStorage('isDarkMode', !isDarkModeApp)
  }

  const dropdownConfig = {
    end: [
      {
        type: 'item',
        itemLabel: `Change to ${isDarkModeApp ? 'Light' : 'Dark'} mode`,
        onClickItem: toggleStyle
      },
      {
        type: 'dropdown',
        label: name.toUpperCase(),
        options: [
          {
            itemLabel: 'Add Pet',
            onClickItem: () => navigate(APP_ROUTES.ADD_PET)
          },
          {
            itemLabel: 'See My Pets',
            onClickItem: () => navigate(APP_ROUTES.LIST_MY_PETS)
          },
          {
            itemLabel: 'Update User',
            onClickItem: () => navigate(APP_ROUTES.UPDATE_USER)
          },
          {
            itemLabel: 'Update Pass',
            onClickItem: () => navigate(APP_ROUTES.UPDATE_PASS)
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