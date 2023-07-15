import { ComponentStory, ComponentMeta } from '@storybook/react';
import NotificationButton, { INotificationButton } from './NotificationButton';
import { mockNotificationButtonProps } from './NotificationButton.mocks';

export default {
  title: 'feedback/NotificationButton',
  component: NotificationButton,
  argTypes: {},
} as ComponentMeta<typeof NotificationButton>;

const Template: ComponentStory<typeof NotificationButton> = (args) => (
  <NotificationButton {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockNotificationButtonProps.base,
} as INotificationButton;
