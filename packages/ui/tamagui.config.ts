import { createTamagui } from 'tamagui'
import { createInterFont } from '@tamagui/font-inter'
import { shorthands } from '@tamagui/shorthands'
import { createAnimations } from '@tamagui/animations-moti'
import { createTokens } from '@tamagui/core'
import { defaultConfig } from '@tamagui/config/v4'

// Create our tokens
const tokens = createTokens({
  size: {
    sm: 38,
    md: 46,
    true: 46,
    lg: 60,
  },
  radius: {
    sm: 4,
    md: 8,
    true: 8,
    lg: 12,
  },
  color: {
    white: '#FFFFFF',
    black: '#000000',
    gray100: '#f6f6f6',
    gray200: '#e9e9e9',
    gray300: '#DADADA',
    gray400: '#B7B7B7',
    gray500: '#999999',
    gray600: '#666666',
    gray700: '#444444',
    gray800: '#2A2A2A',
    gray900: '#1A1A1A',
  },
  space: {
    sm: 15,
    md: 20,
    lg: 25,
    $0: 0,
    '$0.5': 2,
    $1: 4,
    '$1.5': 6,
    $2: 8,
    '$2.5': 10,
    $3: 12,
    '$3.5': 14,
    $4: 16,
    $5: 20,
    $6: 24,
    $7: 28,
    $8: 32,
    $9: 36,
    $10: 40,
    $11: 44,
    $12: 48,
    $13: 52,
    $14: 56,
    $15: 60,
    $16: 64,
    $17: 68,
    $18: 72,
    $19: 76,
    $20: 80,
    $true: 16,
  },
  zIndex: {
    true: 0,
    $0: 0,
    $1: 100,
    $2: 200,
    $3: 300,
    $4: 400,
    $5: 500,
  },
  fontWeight: {
    $3: '300',
    $4: '400',
    $5: '500',
    $6: '600',
    $7: '700',
  },
  fontSize: {
    $true: 14,
    $1: 10,
    $2: 12,
    $3: 14,
    $4: 16,
    $5: 18,
    $6: 20,
    $7: 24,
    $8: 28,
    $9: 32,
    $10: 36,
  },
})

// Create our base themes
const light = {
  background: tokens.color.white,
  backgroundHover: tokens.color.gray100,
  backgroundPress: tokens.color.gray200,
  backgroundFocus: tokens.color.gray200,
  color: tokens.color.black,
  colorHover: tokens.color.gray800,
  colorPress: tokens.color.gray700,
  colorFocus: tokens.color.gray700,
  borderColor: tokens.color.gray300,
  borderColorHover: tokens.color.gray400,
  borderColorFocus: tokens.color.gray400,
  borderColorPress: tokens.color.gray400,
  placeholderColor: tokens.color.gray500,
}

const dark = {
  background: tokens.color.gray900,
  backgroundHover: tokens.color.gray800,
  backgroundPress: tokens.color.gray700,
  backgroundFocus: tokens.color.gray700,
  color: tokens.color.white,
  colorHover: tokens.color.gray100,
  colorPress: tokens.color.gray200,
  colorFocus: tokens.color.gray200,
  borderColor: tokens.color.gray700,
  borderColorHover: tokens.color.gray600,
  borderColorFocus: tokens.color.gray600,
  borderColorPress: tokens.color.gray600,
  placeholderColor: tokens.color.gray600,
}

const themes = {
  light,
  dark,
}

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
  defaultTheme: 'light',
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: true,
  shorthands,
  fonts: {
    heading: createInterFont(),
    body: createInterFont(),
  },
  themes,
  tokens,
})
