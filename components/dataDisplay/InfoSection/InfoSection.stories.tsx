import { ComponentStory, ComponentMeta } from '@storybook/react';
import InfoSection, { IInfoSection } from './InfoSection';
import { mockInfoSectionProps } from './InfoSection.mocks';

export default {
  title: 'dataDisplay/InfoSection',
  component: InfoSection,
  argTypes: {},
} as ComponentMeta<typeof InfoSection>;

const Template: ComponentStory<typeof InfoSection> = (args) => (
  <InfoSection {...args} />
);

export const Base = Template.bind({});

Base.args = {
  ...mockInfoSectionProps.base,
} as IInfoSection;
