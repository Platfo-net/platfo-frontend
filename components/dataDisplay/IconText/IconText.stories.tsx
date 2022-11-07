import { ComponentStory, ComponentMeta } from '@storybook/react';
import IconText, { IIconText } from './IconText';
import { mockIconTextProps } from './IconText.mocks';

export default {
  title: 'dataDisplay/IconText',
  component: IconText,
  argTypes: {},
} as ComponentMeta<typeof IconText>;

const Template: ComponentStory<typeof IconText> = (args) => (
  <IconText {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockIconTextProps.base,
} as IIconText;
