import React from 'react';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { Icon } from '@/components/general/Icon';
import { TypographySize } from '@/styles/globals';

export interface ILoadingCircle {
  opacity?: number;
  color?: string;
  size?: TypographySize;
}
const loadingCircle = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const StyledLoadingCircle = styled(Icon)`
  animation: ${loadingCircle} 3s infinite linear;
  opacity: ${({ opacity }) => opacity};
  margin-left: 8px;
  margin-right: 8px;
`;

const LoadingCircle: React.FC<ILoadingCircle> = ({
  opacity = 0.5,
  color,
  size,
}) => {
  return (
    <StyledLoadingCircle
      name="loading"
      opacity={opacity}
      color={color}
      size={size}
    />
  );
};

export default LoadingCircle;
