import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from '@app-monorepo/ui'
import { YStack } from 'tamagui'

const meta = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    label: {
      control: 'text',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Basic: Story = {
  render: (args) => <Checkbox {...args} />,
  args: {
    label: 'Accept terms and conditions',
  },
}

export const Sizes: Story = {
  render: () => (
    <YStack space="$4">
      <Checkbox size="sm" label="Small checkbox" />
      <Checkbox size="md" label="Medium checkbox" />
      <Checkbox size="lg" label="Large checkbox" />
    </YStack>
  ),
}

export const States: Story = {
  render: () => (
    <YStack gap="$2">
      <Checkbox label="Default checkbox" />
      <Checkbox label="Checked checkbox" defaultChecked />
      <Checkbox label="Disabled checkbox" disabled />
      <Checkbox label="Disabled checked checkbox" disabled defaultChecked />
    </YStack>
  ),
}

export const WithoutLabel: Story = {
  render: (args) => <Checkbox {...args} />,
  args: {
    'aria-label': 'Checkbox without visible label',
  },
}

export const Controlled: Story = {
  render: function ControlledStory() {
    const [checked, setChecked] = useState(false)
    return (
      <Checkbox
        label="Controlled checkbox"
        checked={checked}
        onCheckedChange={() => setChecked(!checked)}
      />
    )
  },
} 