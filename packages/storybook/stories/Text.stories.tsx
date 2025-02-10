import type { Meta, StoryObj } from '@storybook/react'
import { Text, Label, Heading } from '@app-monorepo/ui';
import { Stack } from 'tamagui'

const meta = {
  title: 'UI/Typography',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Text>

export default meta
type Story = StoryObj<typeof meta>

export const TextSizes: Story = {
  render: () => (
    <Stack space="$md">
      <Text size="xs">Extra Small Text</Text>
      <Text size="sm">Small Text</Text>
      <Text size="base">Base Text</Text>
      <Text size="lg">Large Text</Text>
      <Text size="xl">Extra Large Text</Text>
      <Text size="2xl">2XL Text</Text>
    </Stack>
  ),
}

export const TextWeights: Story = {
  render: () => (
    <Stack space="$md">
      <Text weight="light">Light Text</Text>
      <Text weight="regular">Regular Text</Text>
      <Text weight="medium">Medium Text</Text>
      <Text weight="semibold">Semibold Text</Text>
      <Text weight="bold">Bold Text</Text>
    </Stack>
  ),
}

export const TextColors: Story = {
  render: () => (
    <Stack space="$md">
      <Text color="primary">Primary Text</Text>
      <Text color="secondary">Secondary Text</Text>
      <Text color="success">Success Text</Text>
      <Text color="error">Error Text</Text>
      <Text color="warning">Warning Text</Text>
      <Text color="info">Info Text</Text>
      <Text color="muted">Muted Text</Text>
    </Stack>
  ),
}

export const HeadingLevels: Story = {
  render: () => (
    <Stack space="$md">
      <Heading level="h1">Heading 1</Heading>
      <Heading level="h2">Heading 2</Heading>
      <Heading level="h3">Heading 3</Heading>
      <Heading level="h4">Heading 4</Heading>
      <Heading level="h5">Heading 5</Heading>
      <Heading level="h6">Heading 6</Heading>
    </Stack>
  ),
}

export const Labels: Story = {
  render: () => (
    <Stack space="$md">
      <Label>Regular Label</Label>
      <Label required>Required Label</Label>
      <Label disabled>Disabled Label</Label>
    </Stack>
  ),
} 