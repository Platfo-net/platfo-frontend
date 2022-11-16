import { IAvatarCheckBox } from '@/components/dataEntry/AvatarCheckBox/AvatarCheckBox';
import { Avatar } from '@/components/dataDisplay/Avatar';
import React from 'react';

const base: IAvatarCheckBox = {
  size: 'md',
  variant: 'outlined',
  color: 'default',
  label: 'Name',
  avatar: <Avatar click={() => {}} icon="Instagram" size={3.5} type="icon" />,
};

export const mockAvatarCheckBoxProps = {
  base,
};
