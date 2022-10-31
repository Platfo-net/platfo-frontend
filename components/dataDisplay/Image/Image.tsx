import React, { useState } from 'react';
import NextImage from 'next/image';
import styled from '@emotion/styled';

export interface IImage {
  src: string;
  width?: number;
  height?: number;
  alt: string;
}

const StyledImage = styled(NextImage)<IImage>`
  object-fit: cover;
`;

export const Image: React.FC<IImage> = ({ src, width, height, alt }) => {
  const [image, setImage] = useState(src);
  return (
    <StyledImage
      src={image}
      width={width}
      height={height}
      fill={!width && !height}
      alt={alt}
      onError={() => setImage('/assets/error.svg')}
      placeholder="blur"
      blurDataURL="/assets/image-placeholder.jpg"
    />
  );
};
