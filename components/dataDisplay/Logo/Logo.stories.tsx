import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Logo, ILogo } from './Logo';
import { mockLogoProps } from './Logo.mocks';

export default {
  title: 'dataDisplay/Logo',
  component: Logo,
  argTypes: {},
} as ComponentMeta<typeof Logo>;

const Template: ComponentStory<typeof Logo> = (args) => <Logo {...args} />;

export const Base = Template.bind({});

Base.args = {
  ...mockLogoProps.base,
} as ILogo;
