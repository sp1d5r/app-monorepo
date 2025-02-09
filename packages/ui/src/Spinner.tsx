import React from 'react'
import { styled, Stack, GetProps, createAnimations } from 'tamagui'

const SpinnerContainer = styled(Stack, {
  name: 'Spinner',
  alignItems: 'center',
  justifyContent: 'center',

  variants: {
    size: {
      sm: {
        width: '$size.sm',
        height: '$size.sm',
      },
      md: {
        width: '$size.md',
        height: '$size.md',
      },
      lg: {
        width: '$size.lg',
        height: '$size.lg',
      },
    },
  } as const,
})

const animations = createAnimations({
  spin: {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
})

const SpinnerCircle = styled(Stack, {
  borderWidth: 2,
  borderColor: '$gray300',
  borderTopColor: '$primary',
  borderRadius: '$full',
  width: '100%',
  height: '100%',
  animation: {
    name: 'spin',
    duration: 750,
    timing: 'linear',
    iteration: 'infinite'
  },
  {...animations},
})

export type SpinnerProps = GetProps<typeof SpinnerContainer>

export function Spinner({ size = 'md', ...props }: SpinnerProps) {
  return (
    <SpinnerContainer size={size} {...props}>
      <SpinnerCircle />
    </SpinnerContainer>
  )
} 