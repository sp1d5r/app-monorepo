import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@app-monorepo/ui/src/Button';
import { Mail } from '@tamagui/lucide-icons';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    isLoading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Button',
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Button',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    children: 'Medium Button',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    children: 'Loading',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
};

export const WithLeftIcon: Story = {
  args: {
    leftIcon: <Mail size={18} />,
    children: 'Send Email',
  },
};

export const WithRightIcon: Story = {
  args: {
    rightIcon: <Mail size={18} />,
    children: 'Send Email',
  },
};

export const WithBothIcons: Story = {
  args: {
    leftIcon: <Mail size={18} />,
    rightIcon: <Mail size={18} />,
    children: 'Send Email',
  },
};

export const LoadingWithIcon: Story = {
  args: {
    isLoading: true,
    leftIcon: <Mail size={18} />,
    children: 'Sending...',
  },
}; 