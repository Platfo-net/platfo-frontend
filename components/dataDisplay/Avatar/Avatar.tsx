import React from 'react';
import styled from '@emotion/styled';
import { css, SerializedStyles } from '@emotion/react';
import { BrandsIcon, Icon } from '@/components/general/Icon';
import { Image } from '@/components/dataDisplay/Image';
import { Color } from '@/styles/globals';
import { Typography } from '@/components/general/Typography';

const { Text } = Typography;

export type AvatarType = 'icon' | 'image' | 'text';
export interface IAvatar {
  type: AvatarType;
  size?: number;
  icon?: BrandsIcon;
  text?: string;
  url?: string;
  data?: any;
  color?: Color;
  isActive?: boolean;
  title?: string;
  // eslint-disable-next-line no-unused-vars
  click?: (data: any) => void;
}

const getSize = (size?: number): SerializedStyles => css`
  width: ${size}rem;
  height: ${size}rem;
`;

type WrapperType = Pick<IAvatar, 'size' | 'data' | 'color' | 'isActive'>;
const Wrapper = styled.div<WrapperType>`
  display: flex;
  flex-direction: column;
  position: relative;
  ${({ size }) => css`
    width: ${size}rem;
  `};
  height: fit-content;

  ${({ data, color = 'secondary', theme, isActive }) => css`
    span {
      color: ${isActive ? theme.components[color] : 'unset'};
    }
    &:hover {
      span {
        color: ${data ? theme.components[color] : 'unset'};
      }
    }
  `}
`;

type WrapperImageType = Pick<IAvatar, 'size' | 'data' | 'color' | 'isActive'>;
const WrapperImage = styled.div<WrapperImageType>`
  display: flex;
  flex-direction: column;
  border-radius: 9999px;
  padding: 4px;
  border-color: ${({ theme }) => theme.components.border};
  border-width: 2px;
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
    span {
      color: ${isActive ? theme.components[color] : 'unset'};
    }
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

const WrapperText = styled.div`
  display: inline-flex;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.components.border};
  border-radius: 9999px;
  span {
    margin: auto;
  }
`;

type WrapperSmallAvatarType = Pick<IAvatar, 'icon'>;
const WrapperSmallAvatar = styled.div<WrapperSmallAvatarType>`
  position: absolute;
  bottom: 0;
  right: 0;
  display: inline-flex;
  width: 2rem;
  height: 2rem;
  background-color: ${({ theme, icon }) =>
    icon ? theme.brand[icon] : 'transparent'};
  border-radius: 9999px;
  svg {
    color: #FFF;
    margin: auto;
  }
}
`;

type WrapperTitleType = Pick<IAvatar, 'size'>;
const WrapperTitle = styled.div<WrapperTitleType>`
  margin: 0.5rem auto;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: inline-block;
  text-align: center;
  ${({ size }) => css`
    width: ${size}rem;
  `};
`;

export const Avatar: React.FC<IAvatar> = ({
  type,
  size = 5,
  icon,
  url,
  data,
  color,
  isActive,
  title,
  text,
  click,
}) => {
  return (
    <Wrapper size={size} color={color} data={data} isActive={isActive}>
      <WrapperImage
        size={size}
        onClick={data && click ? () => click(data) : () => {}}
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
        {type === 'text' && (
          <WrapperText>
            <Typography.Text weight="semiBold" size="lg">
              {text}
            </Typography.Text>
          </WrapperText>
        )}
        {type === 'image' && url && icon && (
          <WrapperSmallAvatar icon={icon}>
            <Icon name={icon} />
          </WrapperSmallAvatar>
        )}
      </WrapperImage>
      {title && (
        <WrapperTitle size={size}>
          <Text weight="semiBold">{title}</Text>
        </WrapperTitle>
      )}
    </Wrapper>
  );
};
