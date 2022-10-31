import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Image, IImage } from './Image';
import { mockImageProps } from './Image.mocks';

export default {
  title: 'dataDisplay/Image',
  component: Image,
  argTypes: {},
} as ComponentMeta<typeof Image>;

const Template: ComponentStory<typeof Image> = (args) => (
  // eslint-disable-next-line jsx-a11y/alt-text
  <Image {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockImageProps.base,
} as IImage;
