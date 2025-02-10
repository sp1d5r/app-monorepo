import React from 'react'
import { styled, Button as TamaguiButton, GetProps, YStack } from 'tamagui'
import { Spinner } from './Spinner' // You'll need to create this

// Customize TamaguiButton
const CustomButton = styled(TamaguiButton, {
  name: 'Button',
  backgroundColor: '$background',
  borderRadius: '$4',
  paddingVertical: '$2',
  paddingHorizontal: '$3',

  variants: {
    variant: {
      primary: {
        backgroundColor: '$blue10',
        color: 'white',
      },
      secondary: {
        backgroundColor: '$yellow10',
        color: '$color',
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '$blue10',
        color: '$blue10',
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '$blue10',
        hoverStyle: {
          backgroundColor: '$blue2',
        },
      },
    },
    size: {
      sm: {
        padding: '$2',
        fontSize: '$2',
      },
      md: {
        padding: '$3',
        fontSize: '$3',
      },
      lg: {
        padding: '$4',
        fontSize: '$4',
      },
    },
  } as const,

  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})

export type ButtonProps = GetProps<typeof CustomButton> & {
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export function Button({ 
  variant,
  size,
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
      <YStack flexDirection="row" gap="$2" alignItems="center">
        {isLoading && <Spinner size="sm" />}
        {!isLoading && leftIcon}
        {children}
        {!isLoading && rightIcon}
      </YStack>
    </CustomButton>
  )
}
