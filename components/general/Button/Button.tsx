import {
  getBoxShadow,
  Color,
  getColors,
  getSize,
  Size,
  Variant,
  TypographySize,
} from '@/styles/globals';
import styled from '@emotion/styled';
import React, { MouseEvent } from 'react';
import { settings } from '@/styles/Settings';
import LoadingCircle from '@/components/feedback/loading/LoadingCircle/LoadingCircle';
import { Themes } from '@/styles/Themes';
import { AvailableIcons, Icon } from '@/components/general/Icon';
import { css } from '@emotion/react';
import { Typography } from '@/components/general/Typography';

export interface IButton {
  title: string;
  color?: Color;
  size?: Size;
  iconSize?: TypographySize;
  variant?: Variant;
  icon?: AvailableIcons;
  isDisable?: boolean;
  isLoading?: boolean;
  isIconOnly?: boolean;
  width?: string;
  type?: 'submit' | 'button' | 'reset';
  className?: string;
  // eslint-disable-next-line no-unused-vars
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const getIconOnlyStyles = () => css`
  width: auto;
  height: auto;
  padding: 8px 0;
  border-radius: 8px;
  span {
    display: none;
  }
`;

type StyledButtonType = Pick<
  IButton,
  'color' | 'size' | 'variant' | 'isDisable' | 'isIconOnly' | 'width'
>;

const StyledButton = styled.button<StyledButtonType>`
  all: unset;
  display: flex;
  justify-self: center;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: pointer;
  font-weight: 600;
  ${({ size, width }) => getSize(size, width)}
  transition: ${settings.transition};
  ${({ color, variant, theme }) => getColors(color, variant, theme)}
  ${({ theme, variant }) =>
    variant !== 'text' &&
    getBoxShadow(theme.components.shadow1, theme.components.shadow2)};
  ${({ isIconOnly }) => (isIconOnly ? getIconOnlyStyles() : '')}
`;

const StyledIcon = styled(Icon)`
  margin-left: 8px;
  margin-right: 8px;
`;

export const Button: React.FC<IButton> = ({
  title,
  width,
  icon,
  color = 'default',
  variant = 'contained',
  size = 'md',
  isLoading,
  isDisable,
  isIconOnly,
  onClick,
  type = 'button',
  className = '',
  iconSize,
}) => {
  return (
    <StyledButton
      disabled={isLoading || isDisable}
      color={color}
      variant={variant}
      size={size}
      isIconOnly={isIconOnly}
      onClick={onClick}
      width={width}
      type={type}
      className={className}
    >
      {isLoading ? (
        <LoadingCircle
          opacity={1}
          color={Themes.dark.font.nonActive}
          size={size}
        />
      ) : (
        <>
          {icon && (
            <StyledIcon
              name={icon}
              color="currentColor"
              size={iconSize ? iconSize : size}
            />
          )}
        </>
      )}
      <Typography.Text size={size} color={'currentColor'} weight="medium">
        {title}
      </Typography.Text>
    </StyledButton>
  );
};
