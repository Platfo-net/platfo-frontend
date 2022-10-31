import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Button, IButton } from './Button';
import { mockButtonProps } from '@/components/general/Button/Button.mocks';

export default {
  title: 'general/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

export const BasicButton: ComponentStoryObj<typeof Button> = {
  args: {
    ...mockButtonProps.base,
  } as IButton,
};

export const ButtonWithIcon: ComponentStoryObj<typeof Button> = {
  args: {
    ...mockButtonProps.withIcon,
  } as IButton,
};
