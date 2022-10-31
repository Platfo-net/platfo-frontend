import React from 'react';
import styled from '@emotion/styled';
import { css, SerializedStyles } from '@emotion/react';
import { BrandsIcon, Icon } from '@/components/general/Icon';
import { Image } from '@/components/dataDisplay/Image';
import { Color } from '@/styles/globals';

export type AvatarType = 'icon' | 'image';
export interface IAvatar {
  type: AvatarType;
  size?: number;
  icon?: BrandsIcon;
  url?: string;
  data?: any;
  color?: Color;
  isActive?: boolean;
  // eslint-disable-next-line no-unused-vars
  click: (data: any) => void;
}

const getSize = (size?: number): SerializedStyles => css`
  width: ${size}rem;
  height: ${size}rem;
`;

type WrapperType = Pick<IAvatar, 'size' | 'data' | 'color' | 'isActive'>;
const Wrapper = styled.div<WrapperType>`
  display: block;
  border-radius: 9999px;
  padding: 4px;
  border-color: ${({ theme }) => theme.components.border};
  border-width: 2px;
  overflow: hidden;
  position: relative;

  img {
    object-fit: cover;
    border-radius: 9999px;
    padding: 4px;
  }

  ${({ data, color = 'secondary', theme, isActive }) => css`
    border-color: ${isActive
      ? theme.components[color]
      : theme.components.border};
    &:hover {
      cursor: ${data ? 'pointer' : 'default'};
      border-color: ${data ? theme.components[color] : theme.components.border};
    }
  `}

  ${({ size }) => getSize(size)};
`;

type WrapperIconType = Pick<IAvatar, 'icon'>;
const WrapperIcon = styled.div<WrapperIconType>`
  display: inline-flex;
  width: 100%;
  height: 100%;
  background-color: ${({ theme, icon }) =>
    icon ? theme.brand[icon] : 'transparent'};
  border-radius: 9999px;
  svg {
    color: #FFF;
    margin: auto;
  }
}
`;

export const Avatar: React.FC<IAvatar> = ({
  type,
  size = 5,
  icon,
  url,
  data,
  color,
  isActive,
  click,
}) => {
  return (
    <Wrapper
      size={size}
      onClick={() => click(data)}
      color={color}
      data={data}
      isActive={isActive}
    >
      {type === 'image' && url && <Image src={url} alt="" />}
      {type === 'icon' && icon && (
        <WrapperIcon icon={icon}>
          <Icon name={icon} size="6xl" />
        </WrapperIcon>
      )}
    </Wrapper>
  );
};
