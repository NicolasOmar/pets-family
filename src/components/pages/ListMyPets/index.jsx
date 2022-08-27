import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// GRAPHQL CLIENT
import { useQuery } from '@apollo/client'
import { GET_MY_PETS } from '../../../graphql/queries'
// COMPONENTS
import CardsListTemplate from '../../templates/CardsListTemplate'
// PAGE CONFIG
import { cardsListTitle } from './config.json'
// CONSTANTS
import { APP_ROUTES } from '../../../constants/routes.json'
// FUNCTIONS
import {
  parseBooleanStrings,
  parseDateString,
  parseArrayToString
} from '../../../functions/parsers'

const ListMyPets = () => {
  let navigate = useNavigate()
  const { loading, data } = useQuery(GET_MY_PETS, { fetchPolicy: 'network-only' })
  const [petsInfo, setPetsInfo] = useState([])

  useEffect(
    () =>
      setPetsInfo(
        data?.getMyPets?.map(
          ({ name, petType, birthday, isAdopted, adoptionDate, hairColors, eyeColors }, i) => {
            return {
              key: `pet-card-info-${i}`,
              cardTitle: {
                titleText: name,
                titleSize: 'normal',
                subText: petType.name,
                subSize: 'tiny'
              },
              cardContent: [
                `Birthday: ${parseDateString(birthday, '-')}`,
                `Adopted: ${parseBooleanStrings(
                  isAdopted,
                  `Yes, ${parseDateString(adoptionDate, '-')}`,
                  'No'
                )}`,
                `Hair: ${parseArrayToString(hairColors, 'name')}`,
                `Eyes: ${parseArrayToString(eyeColors, 'name')}`
              ],
              cardFooter: [
                { label: 'Update', onClick: () => navigate(`${APP_ROUTES.UPDATE_PET}/${name}`) }
                // { label: 'Remove', onClick: () => navigate(APP_ROUTES.ADD_PET) }
              ],
              childWidth: 3
            }
          }
        ) || []
      ),
    [data, navigate]
  )

  return <CardsListTemplate {...{ isFetching: loading, cardsListTitle, cardListData: petsInfo }} />
}

export default ListMyPets