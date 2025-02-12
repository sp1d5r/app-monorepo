import { Check } from '@tamagui/lucide-icons'
import { styled, GetProps, XStack, Label } from 'tamagui'
import { Checkbox as TamaguiCheckbox } from 'tamagui'
import { createStyledContext } from 'tamagui'
import { SizeTokens, withStaticProperties } from '@tamagui/core'

// Create context for sharing props between components
export const CheckboxContext = createStyledContext({
  size: '$md' as SizeTokens,
})

// Base checkbox frame
const CheckboxFrame = styled(TamaguiCheckbox, {
  name: 'Checkbox',
  context: CheckboxContext,

  variants: {
    size: {
      sm: {
        scale: 0.75,
      },
      md: {
        scale: 1,
      },
      lg: {
        scale: 1.25,
      },
    },
  } as const,

  defaultVariants: {
    size: 'md',
  },
})

// Styled indicator
const CheckboxIndicator = styled(TamaguiCheckbox.Indicator, {
  name: 'CheckboxIndicator',
  context: CheckboxContext,
})

// Styled label
const CheckboxLabel = styled(Label, {
  name: 'CheckboxLabel',
  context: CheckboxContext,
  variants: {
    size: {
      sm: { fontSize: '$2' },
      md: { fontSize: '$3' },
      lg: { fontSize: '$4' },
    },
  },
})

// Create compound component
export const CheckboxComponent = withStaticProperties(CheckboxFrame, {
  Indicator: CheckboxIndicator,
  Label: CheckboxLabel,
})

// Types
export type CheckboxProps = GetProps<typeof CheckboxFrame> & {
  label?: string
}

// Helper function to convert size token to variant
const getSizeVariant = (size: SizeTokens | undefined) => {
  if (!size) return 'md'
  // Handle string case
  if (typeof size === 'string') {
    return size.replace('$', '') as 'sm' | 'md' | 'lg'
  }
  // Handle number case - default to 'md'
  return 'md'
}

// Wrapper component that provides a simpler API
export function Checkbox({ 
  label,
  id,
  size = 'md',
  ...props 
}: CheckboxProps & {
  size?: 'sm' | 'md' | 'lg'
}) {
  const checkboxId = id || `checkbox-${Math.random().toString(36).slice(2)}`

  return (
    <XStack alignItems="center" gap="$4">
      <CheckboxComponent size={size} id={checkboxId} {...props}>
        <CheckboxComponent.Indicator>
          <Check />
        </CheckboxComponent.Indicator>
      </CheckboxComponent>

      {label && (
        <CheckboxComponent.Label size={size} htmlFor={checkboxId}>
          {label}
        </CheckboxComponent.Label>
      )}
    </XStack>
  )
}

// Add displayName to the component
Checkbox.displayName = 'Checkbox'
