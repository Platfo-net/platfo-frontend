import React from 'react';
import BrandLogo from '../../../assets/svg/botinow-logo.svg';
import styled from '@emotion/styled';
import { css, SerializedStyles } from '@emotion/react';

export interface ILogo {
  size?: number;
}

const getSize = (size?: number): SerializedStyles => css`
  width: ${size}rem;
  height: ${size}rem;
`;

const Wrapper = styled.div<ILogo>`
  ${({ size }) => getSize(size)};
  ${({ theme }) =>
    theme.name === 'dark' &&
    css`
      .cls-3 {
        fill: #70d3ba;
      }
      .cls-2 {
        fill: #fff;
      }
    `}
`;

export const Logo: React.FC<ILogo> = ({ size = 5 }) => {
  return (
    <Wrapper size={size}>
      <BrandLogo />
    </Wrapper>
  );
};
