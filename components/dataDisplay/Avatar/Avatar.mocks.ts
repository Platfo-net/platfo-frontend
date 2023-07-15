import { IAvatar } from './Avatar';

const base: IAvatar = {
  type: 'image',
  icon: 'Instagram',
  url: `https://www.somosxbox.com/wp-content/uploads/2018/05/tomb-raider.jpg`,
  size: 8,
  click: () => {},
};

export const mockAvatarProps = {
  base,
};
