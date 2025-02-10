import { styled } from 'tamagui'
import { Text } from './Text'

export const Heading = styled(Text, {
  name: 'Heading',
  fontWeight: '700',

  variants: {
    level: {
      h1: {
        fontSize: 36,
        lineHeight: 1.25,
      },
      h2: {
        fontSize: 30,
        lineHeight: 1.25,
      },
      h3: {
        fontSize: 24,
        lineHeight: 1.375,
      },
      h4: {
        fontSize: 20,
        lineHeight: 1.375,
      },
      h5: {
        fontSize: 18,
        lineHeight: 1.5,
      },
      h6: {
        fontSize: 16,
        lineHeight: 1.5,
      },
    },
  } as const,
})

export type HeadingProps = React.ComponentProps<typeof Heading> 