import { IInfoSection } from './InfoSection';
import { Avatar } from '@/components/dataDisplay/Avatar';

const base: IInfoSection = {
  username: 'Shekoofeh',
  name: 'shekoofeh Dezhahanj',
  follows: 1000,
  followers: 1000,
  description: 'Hi, I`m a programmer.',
  avatar: (
    <Avatar
      type="image"
      url="https://www.somosxbox.com/wp-content/uploads/2018/05/tomb-raider.jpg"
      size={8}
      click={() => {}}
    />
  ),
};

export const mockInfoSectionProps = {
  base,
};
