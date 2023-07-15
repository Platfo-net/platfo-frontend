import { ComponentMeta, ComponentStory } from '@storybook/react';
import {
  Typography,
  TextProps,
} from '@/components/general/Typography/Typography';
import { mockTypographyProps } from '@/components/general/Typography/Typography.mocks';
import {
  textColorOptions,
  typographySizeOptions,
  typographyWeightOptions,
} from '@/styles/globals';

const { Paragraph } = Typography;

export default {
  title: 'general/Typography/Paragraph',
  component: Paragraph,
} as ComponentMeta<typeof Paragraph>;

export const BaseParagraph: ComponentStory<typeof Paragraph> = (args) => (
  <Paragraph {...args} />
);

BaseParagraph.args = {
  ...mockTypographyProps.paragraph,
} as TextProps;

BaseParagraph.argTypes = {
  size: {
    options: Object.keys(typographySizeOptions),
    control: { type: 'select' },
  },
  weight: {
    options: Object.keys(typographyWeightOptions),
    control: { type: 'select' },
  },
  color: {
    options: textColorOptions,
    control: { type: 'select' },
  },
};
