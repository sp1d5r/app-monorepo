import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@app-monorepo/ui';
import { Activity, Airplay } from '@tamagui/lucide-icons';
import { YStack, XStack, XGroup } from 'tamagui';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ButtonVariants: Story = {
  render: () => (
    <YStack gap="$2">
      <Button>Default Button</Button>
      <Button variant="outlined">Outlined Button</Button>
      <Button variant="ghost">Ghost Button</Button>
    </YStack>
  ),
};

export const ButtonSizes: Story = {
  render: () => (
    <YStack gap="$2">
      <Button size="sm">Small Button</Button>
      <Button size="md">Medium Button</Button>
      <Button size="lg">Large Button</Button>
    </YStack>
  ),
};

export const ButtonsWithIcons: Story = {
  render: () => (
    <YStack gap="$2">
      <Button icon={<Airplay />}>Icon Before</Button>
      <Button iconAfter={<Activity />}>Icon After</Button>
      <Button icon={<Airplay />} iconAfter={<Activity />}>Both Icons</Button>
    </YStack>
  ),
};

export const ButtonStates: Story = {
  render: () => (
    <YStack gap="$2">
      <XStack gap="$2">
        <Button disabled>Disabled</Button>
        <Button chromeless>Chromeless</Button>
      </XStack>

      <XStack gap="$2">
        <Button themeInverse>Theme Inverse</Button>
        <Button isLoading>Loading</Button>
      </XStack>
    </YStack>
  ),
};

export const ButtonGroups: Story = {
  render: () => (
    <XGroup>
      <XGroup.Item>
        <Button>Group 1</Button>
      </XGroup.Item>
      <XGroup.Item>
        <Button>Group 2</Button>
      </XGroup.Item>
      <XGroup.Item>
        <Button>Group 3</Button>
      </XGroup.Item>
    </XGroup>
  ),
}; 