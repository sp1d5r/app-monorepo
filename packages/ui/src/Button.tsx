import React, { useContext } from 'react'
import { styled, Button as TamaguiButton, GetProps, YStack, Text, useTheme, Spinner } from 'tamagui'
import { cloneElement, isValidElement } from 'react'
import { SizeTokens, withStaticProperties } from '@tamagui/core'
import { createStyledContext } from 'tamagui'

// Create context for sharing props between components
export const ButtonContext = createStyledContext({
  size: '$md' as SizeTokens,
})

// Base button frame
const ButtonFrame = styled(YStack, {
  name: 'Button',
  context: ButtonContext,
  borderRadius: '$4',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '$background',
  padding: '$3',
  space: '$2',

  pressStyle: {
    opacity: 0.8,
  },

  hoverStyle: {
    backgroundColor: '$backgroundHover',
  },

  variants: {
    size: {
      sm: {
        padding: '$2',
        gap: '$2',
      },
      md: {
        padding: '$3',
        gap: '$2',
      },
      lg: {
        padding: '$4',
        gap: '$2',
        minHeight: 60,
      },
    },

    variant: {
      solid: {
      },
      outlined: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '$color',
        color: '$color',
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '$color',
      },
    },

    chromeless: {
      true: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        pressStyle: {
          opacity: 0.7,
        },
      },
    },

  } as const,

  defaultVariants: {
    variant: 'solid',
    size: 'md',
  },
})

// Button text component
const ButtonText = styled(Text, {
  name: 'ButtonText',
  context: ButtonContext,
  color: 'inherit',
  userSelect: 'none',

  variants: {
    size: {
      sm: { fontSize: '$2' },
      md: { fontSize: '$3' },
      lg: { fontSize: '$4' },
    },
  } as const,
})

// Button icon component
type IconComponent = React.ReactElement<{
  size?: number;
  color?: string;
}>;

type ButtonIconProps = {
  children?: IconComponent;
  size?: number;
  color?: string;
};

const ButtonIcon = ({ children, ...props }: ButtonIconProps) => {
  const { size } = useContext(ButtonContext.context)
  const theme = useTheme()
  const iconSize = size === '$sm' ? 16 : size === '$md' ? 18 : 20

  return isValidElement(children)
    ? cloneElement(children, {
        size: iconSize,
        color: theme.color.get(),
      })
    : null
}

// Export both the compound component and the wrapper
export const ButtonComponent = withStaticProperties(ButtonFrame, {
  Text: ButtonText,
  Icon: ButtonIcon,
  Props: ButtonContext.Provider,
})

// Wrapper component that provides the simpler API
export const Button = ButtonWrapper

// Types
export type ButtonProps = GetProps<typeof ButtonFrame> & {
  isLoading?: boolean
  icon?: IconComponent
  iconAfter?: IconComponent
}

// Update the ButtonWrapper to use ButtonComponent
function ButtonWrapper({ 
  isLoading,
  icon,
  iconAfter,
  children,
  ...props 
}: ButtonProps) {
  return (
    <ButtonComponent {...props}>
      {isLoading && (
        <ButtonComponent.Icon>
          <Spinner size="small" />
        </ButtonComponent.Icon>
      )}
      {!isLoading && icon && (
        <ButtonComponent.Icon>
          {icon}
        </ButtonComponent.Icon>
      )}
      {children && <ButtonComponent.Text>{children}</ButtonComponent.Text>}
      {!isLoading && iconAfter && (
        <ButtonComponent.Icon>
          {iconAfter}
        </ButtonComponent.Icon>
      )}
    </ButtonComponent>
  )
}
