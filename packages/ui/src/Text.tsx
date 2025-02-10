import { styled, Text as TamaguiText, GetProps } from 'tamagui'

export const Text = styled(TamaguiText, {
  name: 'Text',
  color: '$color',

  variants: {
    size: {
      xs: { fontSize: '$2' },
      sm: { fontSize: '$3' },
      base: { fontSize: '$4' },
      lg: { fontSize: '$5' },
      xl: { fontSize: '$6' },
      '2xl': { fontSize: '$7' },
    },
    weight: {
      light: { fontWeight: '$3' },
      regular: { fontWeight: '$4' },
      medium: { fontWeight: '$5' },
      semibold: { fontWeight: '$6' },
      bold: { fontWeight: '$7' },
    },
    align: {
      left: { textAlign: 'left' },
      center: { textAlign: 'center' },
      right: { textAlign: 'right' },
    },
    color: {
      primary: { color: '$primary' },
      secondary: { color: '$secondary' },
      success: { color: '$success' },
      error: { color: '$error' },
      warning: { color: '$warning' },
      info: { color: '$info' },
      muted: { color: '$gray500' },
    },
  } as const,

  defaultVariants: {
    size: 'base',
    weight: 'regular',
  },
})

export type TextProps = GetProps<typeof Text> 