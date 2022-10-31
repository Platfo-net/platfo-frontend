import { ComponentMeta, ComponentStory } from '@storybook/react';
import CheckBox from './CheckBox';

export default {
  title: 'dataEntry/CheckBox',
  component: CheckBox,
} as ComponentMeta<typeof CheckBox>;

const Template: ComponentStory<typeof CheckBox> = (args) => (
  <CheckBox {...args} />
);

export const BasicCheckBox = Template.bind({});

BasicCheckBox.args = {};
