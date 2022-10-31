import { Color } from '@/styles/globals';
import { AvailableIcons } from '@/components/general/Icon';

export declare global {
  interface Window {
    fbAsyncInit: any;
    FB: any;
  }
}

export type Meta = {
  title: string;
  description?: string;
};

export interface IMenu {
  key: string;
  path: string;
  type?: 'link' | 'button';
  isDisable?: boolean;
  color?: Color;
  icon?: AvailableIcons;
}
