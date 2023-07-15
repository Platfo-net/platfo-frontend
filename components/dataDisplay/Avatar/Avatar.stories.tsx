import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Avatar, IAvatar } from './Avatar';
import { mockAvatarProps } from './Avatar.mocks';

export default {
  title: 'dataDisplay/Avatar',
  component: Avatar,
  argTypes: {},
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const Base = Template.bind({});

Base.args = {
  ...mockAvatarProps.base,
} as IAvatar;
