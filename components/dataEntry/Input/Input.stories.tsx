import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { IInput, Input } from './Input';
import { mockIInputProps } from '@/components/dataEntry/Input/Input.mock';

export default {
  title: 'dataEntry/Input',
  component: Input,
} as ComponentMeta<typeof Input>;

export const BasicInput: ComponentStoryObj<typeof Input> = {
  args: {
    ...mockIInputProps.base,
  } as IInput,
};
export const WithIcon: ComponentStoryObj<typeof Input> = {
  args: {
    placeholder: 'Your Name',
    label: 'Name:',
    icon: 'Moon',
  },
};
