import React from 'react'
import Column from '.'
// APP_ROUTES
import { STORYBOOK_ROUTES } from '../../../constants/routes.json'
// CONSTANTS
import { columnSizes } from '../../../constants/bulma-styles.json'
// FUNCTIONS
import { parseObjKeys } from '../../../functions/parsers'
// MOCKS
// import mocks from './index.mocks.json'

export default {
  title: `${STORYBOOK_ROUTES.ATOMS}/Column`,
  component: Column,
  argTypes: {
    width: {
      options: parseObjKeys(columnSizes)
    }
  }
  // args: mocks.minimalConfig
}

const Template = args => <Column {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'