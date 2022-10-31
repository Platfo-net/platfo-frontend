import React from 'react';
import { Tile } from '@/components/dataDisplay/Tile';
import styled from '@emotion/styled';
import { Avatar } from '@/components/dataDisplay/Avatar';
import { Typography } from '@/components/general/Typography';
import { Color } from '@/styles/globals';
import { css } from '@emotion/react';
import { settings } from '@/styles/Settings';

const { Text } = Typography;
export interface IAvatarButton {
  title: string;
  description: string;
  imageUrl: string;
  data?: any;
  color?: Color;
  isActive?: boolean;
  // eslint-disable-next-line no-unused-vars
  click: (data: any) => void;
}

type WrapperType = Pick<IAvatarButton, 'color' | 'isActive'>;
const Wrapper = styled.div<WrapperType>`
  width: 100%;
  section {
    background : ${({ isActive, theme, color = 'secondary' }) =>
      isActive ? theme.components[color] : theme.background}
    transition: ${settings.transition};
    main {
      display: flex;
      justify-content: flex-start;
    }
  }

  &:hover {
    cursor: pointer;
    section {
      ${({ theme, color = 'secondary' }) => css`
        background: ${theme.components[color]};
      `}
    }
  }
`;
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  justify-content: space-between;
`;

const AvatarButton: React.FC<IAvatarButton> = ({
  title,
  imageUrl,
  click,
  data,
  description,
  color,
  isActive,
}) => {
  return (
    <Wrapper onClick={() => click(data)} color={color} isActive={isActive}>
      <Tile>
        <>
          <Avatar type="image" url={imageUrl} click={() => {}} />
          <InfoWrapper>
            <Text weight="semiBold">{title}</Text>
            <Text weight="light" color="nonActive">
              {description}
            </Text>
          </InfoWrapper>
        </>
      </Tile>
    </Wrapper>
  );
};

export default AvatarButton;
