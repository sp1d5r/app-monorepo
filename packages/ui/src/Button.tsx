import React from 'react'
import { styled, Button as TamaguiButton, GetProps, Stack } from 'tamagui'
import { Spinner } from './Spinner'

// Customize TamaguiButton
const CustomButton = styled(TamaguiButton, {
  name: 'Button',
  height: '$size.md',
  paddingHorizontal: '$space.md',
  borderRadius: '$radius.sm',
  
  variants: {
    variant: {
      primary: {
        backgroundColor: '$primary',
        color: '$white',
        hoverStyle: {
          opacity: 0.9,
        },
      },
      secondary: {
        backgroundColor: '$secondary',
        color: '$black',
        hoverStyle: {
          opacity: 0.9,
        },
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '$primary',
        color: '$primary',
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '$primary',
        hoverStyle: {
          backgroundColor: '$gray100',
        },
      },
    },
    size: {
      sm: {
        height: '$size.sm',
        paddingHorizontal: '$space.sm',
        fontSize: '$fontSize.sm',
      },
      md: {
        height: '$size.md',
        paddingHorizontal: '$space.md',
        fontSize: '$fontSize.base',
      },
      lg: {
        height: '$size.lg',
        paddingHorizontal: '$space.lg',
        fontSize: '$fontSize.lg',
      },
    },
  } as const,
})

export type ButtonProps = GetProps<typeof CustomButton> & {
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export function Button({ 
  variant = 'primary',
  size = 'md',
  isLoading,
  leftIcon,
  rightIcon,
  children,
  disabled,
  ...props 
}: ButtonProps) {
  return (
    <CustomButton 
      variant={variant}
      size={size}
      disabled={disabled || isLoading}
      {...props}
    >
      <Stack direction="horizontal" spacing="$space.sm" alignItems="center">
        {isLoading && <Spinner size="sm" />}
        {!isLoading && leftIcon}
        {children}
        {!isLoading && rightIcon}
      </Stack>
    </CustomButton>
  )
}
