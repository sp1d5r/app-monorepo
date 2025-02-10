import React from 'react'
import { styled, YStack, GetProps } from 'tamagui'

const SpinnerFrame = styled(YStack, {
  name: 'Spinner',
  alignItems: 'center',
  justifyContent: 'center',
  
  variants: {
    size: {
      sm: { width: '$3', height: '$3' },
      md: { width: '$4', height: '$4' },
      lg: { width: '$5', height: '$5' },
    },
  } as const,

  defaultVariants: {
    size: 'md',
  },
})

const SpinnerCircle = styled(YStack, {
  borderWidth: 2,
  borderColor: '$color.background',
  borderTopColor: '$color.primary',
  borderRadius: 1000,
  width: '100%',
  height: '100%',
  animation: 'spin 750ms linear infinite',
})

export type SpinnerProps = GetProps<typeof SpinnerFrame>

export function Spinner(props: SpinnerProps) {
  return (
    <SpinnerFrame {...props}>
      <SpinnerCircle />
    </SpinnerFrame>
  )
} 