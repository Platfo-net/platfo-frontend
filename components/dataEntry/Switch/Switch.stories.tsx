import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import Switch from './Switch';

export default {
  title: 'dataEntry/Switch',
  component: Switch,
} as ComponentMeta<typeof Switch>;

export const BasicSwitch: ComponentStoryObj<typeof Switch> = {
  args: {},
};
