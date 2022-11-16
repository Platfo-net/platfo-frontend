import { ComponentMeta, ComponentStory } from '@storybook/react';
import { AvatarCheckBox, IAvatarCheckBox } from './AvatarCheckBox';
import { mockAvatarCheckBoxProps } from '@/components/dataEntry/AvatarCheckBox/AvatarCheckbox.mock';

export default {
  title: 'dataEntry/AvatarCheckBox',
  component: AvatarCheckBox,
} as ComponentMeta<typeof AvatarCheckBox>;

const Template: ComponentStory<typeof AvatarCheckBox> = (args) => (
  <AvatarCheckBox {...args} />
);

export const BasicAvatarCheckBox = Template.bind({});

BasicAvatarCheckBox.args = {
  ...mockAvatarCheckBoxProps.base,
} as IAvatarCheckBox;
