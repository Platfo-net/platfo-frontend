import { ComponentStory, ComponentMeta } from '@storybook/react';
import BackdropLoading, { IBackdropLoading } from './BackdropLoading';
import { mockBackdropLoadingProps } from './BackdropLoading.mocks';

export default {
  title: 'feedback/BackdropLoading',
  component: BackdropLoading,
  argTypes: {},
} as ComponentMeta<typeof BackdropLoading>;

const Template: ComponentStory<typeof BackdropLoading> = (args) => (
  <BackdropLoading {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockBackdropLoadingProps.base,
} as IBackdropLoading;
