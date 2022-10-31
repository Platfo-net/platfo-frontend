import { IButton } from '@/components/general/Button/Button';

const base: IButton = {
  title: 'Button',
  color: 'primary',
  size: 'md',
  variant: 'contained',
  isDisable: false,
  isLoading: false,
  isIconOnly: false,
};

const withIcon: IButton = {
  title: 'Button',
  color: 'primary',
  size: 'md',
  variant: 'contained',
  icon: 'Moon',
  isDisable: false,
  isLoading: false,
  isIconOnly: false,
};

export const mockButtonProps = {
  base,
  withIcon,
};
