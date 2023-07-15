import { INotificationButton } from './NotificationButton';

const base: INotificationButton = {
  notifications: [
    {
      title: 'hi',
      description: 'description',
      id: '1',
      created_at: '2022-11-01T16:58:50.798Z',
      is_readed: false,
    },
    {
      title: 'title2',
      description: 'description 2',
      id: '2',
      created_at: '2022-11-01T16:58:50.798Z',
      is_readed: true,
    },
    {
      title: 'hi',
      description: 'description',
      id: '3',
      created_at: '2022-11-01T16:58:50.798Z',
      is_readed: true,
    },
  ],
};

export const mockNotificationButtonProps = {
  base,
};
