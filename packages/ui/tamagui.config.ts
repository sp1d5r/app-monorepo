import { createInterFont } from '@tamagui/font-inter'
import { shorthands } from '@tamagui/shorthands'
import { createAnimations } from '@tamagui/animations-moti'
import { color, radius, size, space, themes, zIndex } from '@tamagui/themes'
import { createTamagui, createTokens } from 'tamagui'
import { defaultConfig } from '@tamagui/config/v4'

const tokens = createTokens({
  size,
  space,
  zIndex,
  color,
  radius,
})

const animations = createAnimations({
  fast: {
    type: 'spring',
    damping: 20,
    mass: 1.2,
    stiffness: 250,
  },
  medium: {
    type: 'spring',
    damping: 10,
    mass: 0.9,
    stiffness: 100,
  },
  slow: {
    type: 'spring',
    damping: 20,
    stiffness: 60,
  },
})

export default createTamagui({
  ...defaultConfig,
  animations,
  tokens,
  themes, // add your custom themes AFTER spreading defaultConfig
  defaultTheme: 'light',
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: true,
  shorthands,
  fonts: {
    heading: createInterFont(),
    body: createInterFont(),
  }
})

