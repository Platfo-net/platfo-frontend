import { ComponentStory, ComponentMeta } from '@storybook/react';
import LoadingCircle, { ILoadingCircle } from './LoadingCircle';
import { mockLoadingCircleProps } from './LoadingCircle.mocks';

export default {
  title: 'feedback/loading/LoadingCircle',
  component: LoadingCircle,
  argTypes: {},
} as ComponentMeta<typeof LoadingCircle>;

const Template: ComponentStory<typeof LoadingCircle> = (args) => (
  <LoadingCircle {...args} />
);

export const Base = Template.bind({});
Base.args = {
  ...mockLoadingCircleProps.base,
} as ILoadingCircle;
