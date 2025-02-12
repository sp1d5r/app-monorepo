import React from 'react'
import { TamaguiProvider, Theme } from 'tamagui'
import config from '../../ui/tamagui.config'
import type { Preview, StoryFn } from '@storybook/react'

const preview: Preview = {
  decorators: [
    (Story: StoryFn, context) => {
      // Get the theme from globals or default to 'green'
      const theme = context.globals.theme || 'green'
      
      return (
        <TamaguiProvider config={config}>
          <Theme name={theme}>
            <Story />
          </Theme>
        </TamaguiProvider>
      )
    },
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'green',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
          { value: 'green', title: 'Green' },
          { value: 'red', title: 'Red' },
          { value: 'blue', title: 'Blue' },
          { value: 'orange', title: 'Orange' },
        ],
      },
    },
  },
}

export default preview 