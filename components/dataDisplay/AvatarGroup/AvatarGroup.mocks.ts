import { IAvatarGroup } from './AvatarGroup';

const base: IAvatarGroup = {
  data: [
    {
      url: 'https://www.somosxbox.com/wp-content/uploads/2018/05/tomb-raider.jpg',
      name: '1',
    },
    {
      url: 'https://www.somosxbox.com/wp-content/uploads/2018/05/tomb-raider.jpg',
      name: '2',
    },
    {
      url: 'https://www.somosxbox.com/wp-content/uploads/2018/05/tomb-raider.jpg',
      name: '3',
    },
  ],
  urlKey: 'url',
  nameKey: 'name',
  count: 10,
};

export const mockAvatarGroupProps = {
  base,
};
