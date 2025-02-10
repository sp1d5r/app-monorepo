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
      light: { fontWeight: '300' },
      regular: { fontWeight: '400' },
      medium: { fontWeight: '500' },
      semibold: { fontWeight: '600' },
      bold: { fontWeight: '700' },
    },
    align: {
      left: { textAlign: 'left' },
      center: { textAlign: 'center' },
      right: { textAlign: 'right' },
    },
    color: {
      primary: { color: '$color$primary' },
      secondary: { color: '$color$secondary' },
      success: { color: '$color$success' },
      error: { color: '$color$error' },
      warning: { color: '$color$warning' },
      info: { color: '$color$info' },
      muted: { color: '$color$gray500' },
    },
  } as const,

  defaultVariants: {
    size: 'base',
    weight: 'regular',
  } as const,
})

export type TextProps = GetProps<typeof Text> 