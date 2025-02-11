import type { Meta, StoryObj } from '@storybook/react'
import { ButtonComponent } from '@app-monorepo/ui'
import { Activity, Airplay, ChevronRight, Mail, Plus } from '@tamagui/lucide-icons'
import { YStack, XStack, XGroup } from 'tamagui'

const meta = {
  title: 'UI/ButtonCompound',
  component: ButtonComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ButtonComponent>

export default meta
type Story = StoryObj<typeof meta>

export const BasicUsage: Story = {
  render: () => (
    <YStack space="$md">
      <ButtonComponent>
        <ButtonComponent.Text>Basic Button</ButtonComponent.Text>
      </ButtonComponent>

      <ButtonComponent size="lg">
        <ButtonComponent.Icon><Mail /></ButtonComponent.Icon>
        <ButtonComponent.Text>With Icon</ButtonComponent.Text>
      </ButtonComponent>
    </YStack>
  ),
}

export const ComplexLayouts: Story = {
  render: () => (
    <YStack space="$md" alignItems="flex-start">
      <ButtonComponent size="lg">
        <ButtonComponent.Icon><Plus /></ButtonComponent.Icon>
        <YStack>
          <ButtonComponent.Text>Create New Project</ButtonComponent.Text>
          <ButtonComponent.Text size="sm">Start from scratch</ButtonComponent.Text>
        </YStack>
        <ButtonComponent.Icon><ChevronRight /></ButtonComponent.Icon>
      </ButtonComponent>

      <ButtonComponent variant="outlined" size="lg">
        <YStack alignItems="center" space="$1">
          <ButtonComponent.Icon><Activity /></ButtonComponent.Icon>
          <ButtonComponent.Text>Activity</ButtonComponent.Text>
        </YStack>
      </ButtonComponent>
    </YStack>
  ),
}

export const MultipleIcons: Story = {
  render: () => (
    <YStack space="$md">
      <ButtonComponent>
        <ButtonComponent.Icon><Mail /></ButtonComponent.Icon>
        <ButtonComponent.Text>Inbox</ButtonComponent.Text>
        <ButtonComponent.Icon><ChevronRight /></ButtonComponent.Icon>
      </ButtonComponent>

      <ButtonComponent variant="outlined">
        <ButtonComponent.Icon><Airplay /></ButtonComponent.Icon>
        <ButtonComponent.Text>Share Screen</ButtonComponent.Text>
        <ButtonComponent.Icon><Activity /></ButtonComponent.Icon>
      </ButtonComponent>
    </YStack>
  ),
}

export const CustomStyling: Story = {
  render: () => (
    <YStack space="$md">
      <ButtonComponent 
        backgroundColor="$blue8" 
        pressStyle={{ backgroundColor: '$blue10' }}
      >
        <ButtonComponent.Icon><Mail /></ButtonComponent.Icon>
        <ButtonComponent.Text color="white">Custom Colors</ButtonComponent.Text>
      </ButtonComponent>

      <ButtonComponent
        borderRadius="$8"
        borderWidth={2}
        borderColor="$color"
        backgroundColor="transparent"
      >
        <ButtonComponent.Text>Custom Border</ButtonComponent.Text>
      </ButtonComponent>
    </YStack>
  ),
}

export const GroupedButtons: Story = {
  render: () => (
    <XGroup>
      <XGroup.Item>
        <ButtonComponent>
          <ButtonComponent.Icon><Mail /></ButtonComponent.Icon>
          <ButtonComponent.Text>Mail</ButtonComponent.Text>
        </ButtonComponent>
      </XGroup.Item>
      <XGroup.Item>
        <ButtonComponent>
          <ButtonComponent.Icon><Activity /></ButtonComponent.Icon>
          <ButtonComponent.Text>Activity</ButtonComponent.Text>
        </ButtonComponent>
      </XGroup.Item>
      <XGroup.Item>
        <ButtonComponent>
          <ButtonComponent.Icon><Airplay /></ButtonComponent.Icon>
          <ButtonComponent.Text>Share</ButtonComponent.Text>
        </ButtonComponent>
      </XGroup.Item>
    </XGroup>
  ),
}

export const SizeVariants: Story = {
  render: () => (
    <YStack space="$md">
      <ButtonComponent size="sm">
        <ButtonComponent.Icon><Mail /></ButtonComponent.Icon>
        <ButtonComponent.Text>Small</ButtonComponent.Text>
      </ButtonComponent>

      <ButtonComponent size="md">
        <ButtonComponent.Icon><Mail /></ButtonComponent.Icon>
        <ButtonComponent.Text>Medium</ButtonComponent.Text>
      </ButtonComponent>

      <ButtonComponent size="lg">
        <ButtonComponent.Icon><Mail /></ButtonComponent.Icon>
        <ButtonComponent.Text>Large</ButtonComponent.Text>
      </ButtonComponent>
    </YStack>
  ),
} 