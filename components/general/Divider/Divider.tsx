import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

export interface IDivider {
  type?: 'dashed' | 'dotted' | 'solid';
  size?: number;
}

const Hr = styled.hr<IDivider>`
  ${({ theme, size = 1, type = 'solid' }) => css`
    border-top: ${size}px ${type} ${theme.components.border};
    border-bottom: none;
  `}
`;
const Divider: React.FC<IDivider> = ({ type = 'solid', size = 1 }) => {
  return <Hr type={type} size={size} />;
};

export default Divider;
