import { ComponentStory, ComponentMeta } from '@storybook/react';
import TileButton, { ITileButton } from './TileButton';
import { mockTileButtonProps } from './TileButton.mocks';

export default {
  title: 'general/TileButton',
  component: TileButton,
  argTypes: {},
} as ComponentMeta<typeof TileButton>;

const Template: ComponentStory<typeof TileButton> = (args) => (
  <TileButton {...args} />
);

export const Base = Template.bind({});
Base.args = {
  ...mockTileButtonProps.base,
} as ITileButton;
