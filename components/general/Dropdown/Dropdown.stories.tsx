import { ComponentStory, ComponentMeta } from '@storybook/react';
import Dropdown from './Dropdown';
import { useState } from 'react';
import { Button } from '@/components/general/Button';

export default {
  title: 'general/Dropdown',
  component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

export const BasicDropdown: ComponentStory<typeof Dropdown> = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className=" relative">
      <Button
        color="primary"
        onClick={() => setIsVisible(!isVisible)}
        title="Dropdown"
      />
      <Dropdown isVisible={isVisible}>
        <div className="py-4">
          <div className="font-medium">Hi I`m Dropdown content</div>
        </div>
      </Dropdown>
    </div>
  );
};
