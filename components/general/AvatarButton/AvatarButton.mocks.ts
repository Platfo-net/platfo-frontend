import { IAvatarButton } from './AvatarButton';

const base: IAvatarButton = {
  click(data: any): {} {
    return data;
  },
  imageUrl: `https://www.somosxbox.com/wp-content/uploads/2018/05/tomb-raider.jpg`,
  title: 'username',
  description: 'last message',
};

export const mockAvatarButtonProps = {
  base,
};
