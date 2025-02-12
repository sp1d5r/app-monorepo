import React from 'react'
import { TamaguiProvider, Theme } from 'tamagui'
import config from '../../ui/tamagui.config'
import type { Preview, StoryFn } from '@storybook/react'

const preview: Preview = {
  decorators: [
    (Story: StoryFn) => {
      return (
        <TamaguiProvider config={config}>
          <Theme name="red">
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
}

export default preview 