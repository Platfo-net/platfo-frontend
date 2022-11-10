import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export interface IDot {
  isTrue: boolean;
  size?: number;
  className?: string;
}

const StyledDot = styled.span<IDot>`
  border-radius: 100%;
  ${({ theme, isTrue, size = 0.8 }) => css`
    display: block;
    width: ${size}rem;
    height: ${size}rem;
    background: ${isTrue ? theme.components.success : theme.components.danger};
    box-shadow: ${isTrue
      ? `0 0 5px 2px rgba(96, 214, 164, 0.59),${theme.components.success} 0 0 8px 0`
      : `
    0 0 5px 2px rgba(254, 129, 130, 0.5),${theme.components.danger} 0 0 8px 0`};
  `}
`;

export const Dot: React.FC<IDot> = ({ isTrue, size = 0.8, className }) => {
  return <StyledDot isTrue={isTrue} size={size} className={className} />;
};
