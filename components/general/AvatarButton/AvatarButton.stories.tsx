import { ComponentStory, ComponentMeta } from '@storybook/react';
import AvatarButton, { IAvatarButton } from './AvatarButton';
import { mockAvatarButtonProps } from './AvatarButton.mocks';

export default {
  title: 'general/AvatarButton',
  component: AvatarButton,
  argTypes: {},
} as ComponentMeta<typeof AvatarButton>;

const Template: ComponentStory<typeof AvatarButton> = (args) => (
  <AvatarButton {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockAvatarButtonProps.base,
} as IAvatarButton;
