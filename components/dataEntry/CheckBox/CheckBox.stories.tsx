import { ComponentMeta, ComponentStory } from '@storybook/react';
import { CheckBox, ICheckBox } from './CheckBox';
import { mockCheckBoxProps } from '@/components/dataEntry/CheckBox/Checkbox.mock';

export default {
  title: 'dataEntry/CheckBox',
  component: CheckBox,
} as ComponentMeta<typeof CheckBox>;

const Template: ComponentStory<typeof CheckBox> = (args) => (
  <CheckBox {...args} />
);

export const BasicCheckBox = Template.bind({});

BasicCheckBox.args = {
  ...mockCheckBoxProps.base,
} as ICheckBox;
