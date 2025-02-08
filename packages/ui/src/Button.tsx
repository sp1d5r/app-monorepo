import React from 'react'
import { styled, Button as TamaguiButton } from 'tamagui'

// Customize TamaguiButton
const CustomButton = styled(TamaguiButton, {
  name: 'Button',
  variants: {
    variant: {
      primary: {
        backgroundColor: '$primary',
        color: '$white',
      },
      secondary: {
        backgroundColor: '$secondary',
        color: '$black',
      },
    },
  },
})

export type ButtonProps = {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
}

export function Button({ variant = 'primary', children }: ButtonProps) {
  return <CustomButton variant={variant}>{children}</CustomButton>
}
