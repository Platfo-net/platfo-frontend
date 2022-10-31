import { ComponentStory, ComponentMeta } from '@storybook/react';
import Divider, { IDivider } from './Divider';
import { mockDividerProps } from './Divider.mocks';

export default {
  title: 'general/Divider',
  component: Divider,
  argTypes: {},
} as ComponentMeta<typeof Divider>;

const Template: ComponentStory<typeof Divider> = (args) => (
  <Divider {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockDividerProps.base,
} as IDivider;
