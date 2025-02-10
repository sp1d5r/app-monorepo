import { styled } from 'tamagui'
import { Text } from './Text'

const StyledLabel = styled(Text, {
  name: 'Label',
  size: 'sm',
  fontWeight: '$5',

  variants: {
    disabled: {
      true: {
        opacity: 0.5,
      },
    },
  } as const,
})

type LabelProps = React.ComponentProps<typeof StyledLabel> & {
  required?: boolean
}

export function Label({ required, children, ...props }: LabelProps) {
  return (
    <StyledLabel {...props}>
      {children}
      {required && <Text color="error"> *</Text>}
    </StyledLabel>
  )
} 