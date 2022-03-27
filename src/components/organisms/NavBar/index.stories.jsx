import React from 'react'
import NavBar from '.'
// APP_ROUTES
import { STORYBOOK_ROUTES } from '../../../constants/routes.json'
// MOCKS
import mocks from './index.mocks.json'

export default {
  title: `${STORYBOOK_ROUTES.ORGANISMS}/NavBar`,
  component: NavBar
}

const Template = args => <NavBar {...args} />

export const Minimal = Template.bind({})
Minimal.storyName = 'Minimal config'

export const WithStart = Template.bind({})
WithStart.storyName = 'With items at start'
WithStart.args = mocks.startConfig

export const WithStartAndEnd = Template.bind({})
WithStartAndEnd.storyName = 'With items at start and end'
WithStartAndEnd.args = {
  ...mocks.startConfig,
  ...mocks.endConfig
}

export const withDropdownConfigAtEnd = Template.bind({})
withDropdownConfigAtEnd.storyName = 'With items at start and a dropdown'
withDropdownConfigAtEnd.args = {
  ...mocks.startConfig,
  ...mocks.withDropdownConfig
}