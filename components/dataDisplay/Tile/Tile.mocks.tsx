import { ITile } from '@/components/dataDisplay/Tile/Tile';
import { Avatar } from '@/components/dataDisplay/Avatar';
import { Typography } from '@/components/general/Typography';

const base: ITile = {
  title: 'hi',
};

const withAvatar: ITile = {
  title: 'hi',
  avatar: <Avatar icon="Instagram" size={8} type="icon" click={() => {}} />,
  children: <Typography.Text> I`m children </Typography.Text>,
  clickLabel: 'Click',
  click: () => {},
  clickColor: 'secondary',
};

export const mockTileProps = {
  base,
  withAvatar,
};
