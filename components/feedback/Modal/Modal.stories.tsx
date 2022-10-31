import { ComponentMeta, ComponentStory } from '@storybook/react';
import { Modal } from './Modal';
import { useState } from 'react';
import { Button } from '@/components/general/Button';

export default {
  title: 'feedback/Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

export const BasicModal: ComponentStory<typeof Modal> = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="container mx-auto">
      <div className="flex flex-col space-y-4">
        <Button
          color="primary"
          onClick={() => setIsVisible(true)}
          title="Open Modal"
        />
        <Modal
          isVisible={isVisible}
          title="Modal Title"
          cancel={() => setIsVisible(false)}
          width="50%"
          submitKey="save"
          submit={() => setIsVisible(false)}
          cancelKey="cancel"
        >
          <div className="py-4">
            <div className="font-medium">Hi I`m modal content</div>
          </div>
        </Modal>
      </div>
    </div>
  );
};
