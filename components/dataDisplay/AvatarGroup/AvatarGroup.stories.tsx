import { ComponentStory, ComponentMeta } from '@storybook/react';
import { IAvatarGroup, AvatarGroup } from './AvatarGroup';
import { mockAvatarGroupProps } from './AvatarGroup.mocks';

export default {
  title: 'dataDisplay/AvatarGroup',
  component: AvatarGroup,
  argTypes: {},
} as ComponentMeta<typeof AvatarGroup>;

const Template: ComponentStory<typeof AvatarGroup> = (args) => (
  <AvatarGroup {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockAvatarGroupProps.base,
} as IAvatarGroup;
