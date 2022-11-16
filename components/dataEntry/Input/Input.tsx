import { AvailableIcons, Icon } from '@/components/general/Icon';
import {
  getBoxShadow,
  Color,
  getColors,
  getSize,
  Size,
  Variant,
} from '@/styles/globals';
import styled from '@emotion/styled';
import React, { ForwardedRef, forwardRef } from 'react';
import { settings } from '@/styles/Settings';
import { Typography } from '@/components/general/Typography';

export type InputType =
  | 'email'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'text';

const IconSize = {
  sm: 1,
  md: 1.5,
  lg: 2,
};

export interface IInput {
  label?: string;
  value?: string;
  placeholder?: string;
  width?: string;
  status?: 'danger' | 'warning' | 'success' | 'default';
  color?: Color;
  size?: Size;
  variant?: Variant;
  type?: InputType;
  icon?: AvailableIcons;
  feedback?: string;
  className?: string;
}

type StyledInputType = {
  value?: string;
  placeholder?: string;
  width?: string;
  color?: Color;
  status?: 'danger' | 'warning' | 'success' | 'default';
  inputSize?: Size;
  variant?: Variant;
  type?: InputType;
  icon?: AvailableIcons;
};

const StyledInput = styled.input<StyledInputType>`
  all: unset;
  transition: ${settings.transition};
  padding-left: ${({ icon, inputSize }) =>
    icon && inputSize ? IconSize[inputSize] + 0.2 : 1}rem;
  ${({ inputSize, width }) => getSize(inputSize, width)}
  ${({ variant, theme, status }) => getColors(status, variant, theme)}
  ${({ theme }) =>
    getBoxShadow(theme.components.shadow1, theme.components.shadow2)};
  color: ${({ theme }) => theme.font.regular};
  &::placeholder {
    color: ${({ theme }) => theme.font.placeholder};
  }
  ~ svg {
    padding-left: ${({ icon, inputSize }) => (icon && inputSize ? 0.4 : 1)}rem;
    color: ${({ theme }) => theme.font.placeholder};
  }
  &:focus,
  &:hover {
    ${({ variant, theme, color }) => getColors(color, variant, theme)}
    ~ svg {
      color: ${({ theme }) => theme.components.primary};
    }
  }
`;

type WrapperType = Pick<IInput, 'width'>;
const Wrapper = styled.div<WrapperType>`
  position: relative;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  transition: ${settings.transition};
  width: ${({ width }) => (width ? width : '100%')};
  span {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
`;

type StyledIconType = Pick<IInput, 'icon'>;
const StyledIcon = styled(Icon)<StyledIconType>`
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
`;

const Feedback = styled(Typography.Text)`
  position: absolute;
  bottom: -20px;
`;

export const Input: React.FC<IInput> = forwardRef(
  (
    {
      label,
      value,
      type,
      width = '100%',
      placeholder,
      feedback,
      icon,
      variant = 'outlined',
      status = 'default',
      color = 'primary',
      size = 'md',
      className = '',
      ...rest
    },
    ref
  ) => {
    return (
      <Wrapper className={className}>
        <Typography.Text size={size}>{label}</Typography.Text>
        <div className="flex relative">
          <StyledInput
            ref={ref as ForwardedRef<HTMLInputElement>}
            value={value}
            placeholder={placeholder}
            type={type}
            width={width}
            variant={variant}
            color={color}
            status={status}
            icon={icon}
            inputSize={size}
            {...rest}
          />
          {icon && (
            <StyledIcon name={icon} size={size === 'sm' ? 'lg' : '2xl'} />
          )}
        </div>

        <Feedback size={'sm'} color={status === 'default' ? 'regular' : status}>
          {feedback}
        </Feedback>
      </Wrapper>
    );
  }
);

Input.displayName = 'Input';
