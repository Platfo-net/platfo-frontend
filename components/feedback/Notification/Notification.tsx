import React from 'react';
import { Button } from '@/components/general/Button';
import showNotify, {
  SnackbarSettings,
} from '@/components/feedback/Notification/snackbar';

const Notification: React.FC = () => {
  const onClick = () => {
    showNotify({
      text: 'hi',
    } as SnackbarSettings);
  };
  return (
    <>
      <Button title="default" onClick={onClick} />
      <Button title="danger" onClick={onClick} />
      <Button title="success" onClick={onClick} />
    </>
  );
};

export default Notification;
