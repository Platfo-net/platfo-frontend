import { ComponentMeta, ComponentStoryObj } from '@storybook/react';
import { Tile, ITile } from './Tile';
import { mockTileProps } from '@/components/dataDisplay/Tile/Tile.mocks';

export default {
  title: 'dataDisplay/Tile',
  component: Tile,
} as ComponentMeta<typeof Tile>;

export const BasicTile: ComponentStoryObj<typeof Tile> = {
  args: {
    ...mockTileProps.base,
  } as ITile,
};

export const TileWithAvatar: ComponentStoryObj<typeof Tile> = {
  args: {
    ...mockTileProps.withAvatar,
  } as ITile,
};
