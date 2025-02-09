import { createTamagui, createTokens } from '@tamagui/core'
import { shorthands } from '@tamagui/shorthands'

const tokens = createTokens({
  // Colors
  color: {
    // Base colors
    white: '#FFFFFF',
    black: '#000000',
    
    // Brand colors
    primary: '#5C7AEA',
    secondary: '#EBB434',
    
    // Semantic colors
    success: '#4CAF50',
    warning: '#FFC107',
    error: '#FF5252',
    info: '#2196F3',
    
    // Grays
    gray100: '#F5F5F5',
    gray200: '#EEEEEE',
    gray300: '#E0E0E0',
    gray400: '#BDBDBD',
    gray500: '#9E9E9E',
    gray600: '#757575',
    gray700: '#616161',
    gray800: '#424242',
    gray900: '#212121',
    
    // Background variations
    backgroundLight: '$white',
    backgroundDark: '$black',
    backgroundMuted: '$gray100',
  },

  // Spacing
  space: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    '3xl': 64,
  },

  // Sizing
  size: {
    xs: 24,
    sm: 32,
    md: 48,
    lg: 64,
    xl: 80,
    '2xl': 96,
    '3xl': 128,
    
    // Container sizes
    container: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },

  // Border radius
  radius: {
    none: 0,
    xs: 2,
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    full: 9999,
  },

  // Typography
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },

  // Font weights
  fontWeight: {
    thin: '100',
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    black: '900',
  },

  // Line heights
  lineHeight: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  // Shadows
  shadow: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
  },

  // Z-index
  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
  },
})

const config = createTamagui({
  defaultTheme: 'light',
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: true,
  shorthands,
  tokens,
  themes: {
    light: {
      background: tokens.color.white,
      color: tokens.color.black,
    },
    dark: {
      background: tokens.color.black,
      color: tokens.color.white,
    },
  },
  fonts: {
    body: {
      family: 'System',
      size: {
        1: 14,
        2: 16,
        3: 18,
      },
      lineHeight: {
        1: 20,
      }
    }
  }
})

export type AppConfig = typeof config

declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config
