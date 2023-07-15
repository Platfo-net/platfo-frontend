import { ComponentStory, ComponentMeta } from '@storybook/react';
import { IDot, Dot } from './Dot';
import { mockDotProps } from './Dot.mocks';

export default {
  title: 'feedback/Dot',
  component: Dot,
  argTypes: {},
} as ComponentMeta<typeof Dot>;

const Template: ComponentStory<typeof Dot> = (args) => <Dot {...args} />;

export const Base = Template.bind({});

Base.args = {
  ...mockDotProps.base,
} as IDot;
