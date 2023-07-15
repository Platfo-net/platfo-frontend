import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export interface IDivider {
  type?: 'dashed' | 'dotted' | 'solid';
  size?: number;
  isVertical?: boolean;
  height?: string;
  className?: string;
}

const Hr = styled.hr<IDivider>`
  ${({ theme, size = 1, type = 'solid', isVertical = false, height }) => css`
    border-top: ${isVertical
      ? 'none'
      : `${size}px ${type} ${theme.components.border}`};
    border-left: ${isVertical
      ? `${size}px ${type} ${theme.components.border}`
      : 'none'};
    border-bottom: none;
    border-right: none;
    height: ${isVertical ? height : 'unset'};
  `}
`;
const Divider: React.FC<IDivider> = ({
  type = 'solid',
  size = 1,
  isVertical = false,
  height,
  className,
}) => {
  return (
    <Hr
      type={type}
      size={size}
      isVertical={isVertical}
      height={height}
      className={className}
    />
  );
};

export default Divider;
