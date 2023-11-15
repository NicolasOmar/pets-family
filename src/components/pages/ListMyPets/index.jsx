import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// GRAPHQL CLIENT
import { useQuery } from '@apollo/client'
import { GET_MY_PETS_QUERY } from '../../../graphql/queries'
// COMPONENTS
import CardsListTemplate from '../../templates/CardsListTemplate'
// PAGE CONFIG
import CONFIG from './config.json'
// CONSTANTS
import ROUTES from '../../../constants/routes.json'
// FUNCTIONS
import {
  parseBooleanToString,
  parseDateString,
  parseArrayToString,
  capitalizeWord
} from '../../../functions/parsers'
import { debouncer } from '../../../functions/methods'

const { cardsListTitle, passedAwayIcon, petTitle } = CONFIG
const { APP_ROUTES } = ROUTES

const ListMyPets = () => {
  let navigate = useNavigate()
  const { loading, data, refetch } = useQuery(
    GET_MY_PETS_QUERY, {
      fetchPolicy: 'network-only'
    })
  const [petsInfo, setPetsInfo] = useState([])
  const basicCallbackInput = (event) => {
    const searchValue = event.target.value
    refetch({ search: searchValue })
  }  
  const searchInput = {
    type: 'text',
    control: 'search',
    placeHolder: 'Search your pet by its name',
    onInputChange: debouncer(basicCallbackInput, 500)
  }

  /** ToDo:
   * - What happens if you have no value? Do you show any message?
   */
  useEffect(
    () =>
      setPetsInfo(
        data?.getMyPets?.map(
          (
            {
              id,
              name,
              petType,
              birthday,
              isAdopted,
              adoptionDate,
              gender,
              hairColors,
              hasHeterochromia,
              eyeColors,
              passedAway
            },
            i
          ) => {
            const parsedBirthday = parseDateString(birthday, '-')
            const parsedAdoptionDate = parseBooleanToString(
              isAdopted, [`Yes, ${parseDateString(adoptionDate, '-')}`, 'No']
            )
            const parsedHairColors = parseArrayToString(hairColors, 'name')
            const parsedHeterochromia = parseBooleanToString(
              hasHeterochromia, ['Yes', 'No']
            )
            const parsedEyeColors = parseArrayToString(eyeColors, 'name')

            return {
              key: `pet-card-info-${i}`,
              cardContent: [
                passedAway ? passedAwayIcon : null,
                {
                  type: 'title',
                  content: {
                    ...petTitle,
                    titleText: name,
                    subText: petType.name,
                  }
                },
                {
                  type: 'section',
                  content: `Birthday: ${parsedBirthday}`
                },
                {
                  type: 'section',
                  content: `Adopted: ${parsedAdoptionDate}`
                },
                {
                  type: 'section',
                  content: `Gender: ${capitalizeWord(gender)}`
                },
                {
                  type: 'section',
                  content: `Hair: ${parsedHairColors}`
                },
                {
                  type: 'section',
                  content: `Has Heterochromia: ${parsedHeterochromia}`
                },
                {
                  type: 'section',
                  content: `Eyes: ${parsedEyeColors}`
                }
              ].filter(items => items),
              cardFooter: [
                {
                  label: 'Update',
                  onClick: () => navigate(`${APP_ROUTES.UPDATE_PET}/${id}`)
                }
              ],
              childWidth: 3
            }
          }
        ) || []
      ),
    [data, navigate]
  )

  return (
    <CardsListTemplate {...{
      cardsListData: petsInfo,
      cardsListTitle,
      searchInput,
      isFetching: loading,
    }} />)
}

export default ListMyPets
