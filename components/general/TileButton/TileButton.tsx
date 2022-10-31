import React, { MouseEvent } from 'react';
import styled from '@emotion/styled';
import { Color, getTileSize } from '@/styles/globals';
import { Typography } from '@/components/general/Typography';
import { Icon } from '@/components/general/Icon';

export interface ITileButton {
  title: string;
  width?: string;
  height?: string;
  color?: Color;
  // eslint-disable-next-line no-unused-vars
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

type ButtonType = Omit<ITileButton, 'title'>;
const Button = styled.button<ButtonType>`
  ${({ width, height }) => getTileSize(width, height)};
  background: transparent;
  border: ${({ theme }) => `3px dashed ${theme.components.border}`};
  box-shadow: none;
  display: flex;
  div {
    display: flex;
    flex-direction: column;
    margin: auto;
    .icon {
      background: ${({ theme }) => theme.components.border};
      border-radius: 9999px;
      padding: 16px;
      margin-bottom: 16px;
    }
  }
  &:hover {
    border: ${({ theme, color = 'secondary' }) =>
      `3px dashed ${theme.components[color]}`};
    .icon {
      background: ${({ theme, color = 'secondary' }) =>
        theme.components[color]};
    }
  }
`;

const TileButton: React.FC<ITileButton> = ({
  title,
  onClick,
  width = '255px',
  height = '255px',
  color = 'secondary',
}) => {
  return (
    <Button onClick={onClick} width={width} height={height} color={color}>
      <div>
        <div className="icon">
          <Icon name="Plus" />
        </div>
        <Typography.Text weight="semiBold">{title}</Typography.Text>
      </div>
    </Button>
  );
};

export default TileButton;
