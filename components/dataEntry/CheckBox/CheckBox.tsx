import { useId } from '@/components/hooks/useId';
import {
  Color,
  getBoxShadow,
  getColors,
  Size,
  Variant,
} from '@/styles/globals';
import { settings } from '@/styles/Settings';
import styled from '@emotion/styled';
import React, { ChangeEvent, ForwardedRef, forwardRef } from 'react';
import { Icon } from '@/components/general/Icon';
import { Typography } from '@/components/general/Typography';
import { css, SerializedStyles } from '@emotion/react';

export interface ICheckBox {
  label?: string;
  color?: Color;
  size?: Size;
  variant?: Variant;
  className?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const getSizeCheckBox = (size?: Size): SerializedStyles => {
  if (size === 'sm') {
    return css`
      width: 1rem;
      height: 1rem;
      border-radius: 0.2rem;
    `;
  }
  if (size === 'md') {
    return css`
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 0.3rem;
    `;
  }
  if (size === 'lg') {
    return css`
      width: 3rem;
      height: 3rem;
      border-radius: 0.6rem;
    `;
  }
  return css``;
};

type WrapperType = Pick<ICheckBox, 'color' | 'variant'>;
const Wrapper = styled.div<WrapperType>`
  display: flex;
  margin-top: auto;
  & input {
    display: none;
  }
  & input:checked {
    & ~ label {
      ${({ theme, color }) => getColors(color, 'contained', theme)}
      svg {
        opacity: 1;
        color: currentColor;
      }
    }
  }

  span {
    margin: auto 0;
  }
`;

type VisiblePartType = Pick<ICheckBox, 'color' | 'variant' | 'size'>;
const VisiblePart = styled.label<VisiblePartType>`
  display: inline-flex;
  user-select: none;
  cursor: pointer;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
  ${({ size }) => getSizeCheckBox(size)}
  ${({ variant, theme }) => getColors('default', variant, theme)}
  ${({ theme }) =>
    getBoxShadow(theme.components.shadow1, theme.components.shadow2)};
  svg {
    opacity: 0;
    margin: auto;
    color: currentColor;
    transition: ${settings.transition};
  }

  &:hover {
    ${({ variant, theme, color }) => getColors(color, variant, theme)}
  }
`;

export const CheckBox: React.FC<ICheckBox> = forwardRef(
  (
    {
      label,
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      className,
      onChange,
      ...rest
    },
    ref
  ) => {
    const fieldId = useId();
    return (
      <Wrapper className={className} color={color} variant={variant}>
        <input
          ref={ref as ForwardedRef<HTMLInputElement>}
          id={fieldId}
          type="checkbox"
          onChange={onChange}
          {...rest}
        />
        <VisiblePart
          color={color}
          variant={variant}
          size={size}
          htmlFor={fieldId}
        >
          <Icon name="Check" size={size} />
        </VisiblePart>
        <Typography.Text size={size}>{label}</Typography.Text>
      </Wrapper>
    );
  }
);

CheckBox.displayName = 'CheckBox';
