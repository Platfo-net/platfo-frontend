import { ComponentMeta, ComponentStory } from '@storybook/react';
import {
  Typography,
  titleLevelOptions,
  TitleProps,
} from '@/components/general/Typography/Typography';
import { mockTypographyProps } from '@/components/general/Typography/Typography.mocks';
import {
  textColorOptions,
  typographySizeOptions,
  typographyWeightOptions,
} from '@/styles/globals';

const { Title } = Typography;

export default {
  title: 'general/Typography/Title',
  component: Title,
} as ComponentMeta<typeof Title>;

export const BaseTitle: ComponentStory<typeof Title> = (args) => (
  <Title {...args} />
);

BaseTitle.args = {
  ...mockTypographyProps.title,
} as TitleProps;

BaseTitle.argTypes = {
  level: {
    options: titleLevelOptions,
    control: { type: 'select' },
  },
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
