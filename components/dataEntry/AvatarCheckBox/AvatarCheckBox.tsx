import { useId } from '@/components/hooks/useId';
import { Color, getColors, Size, Variant } from '@/styles/globals';
import { settings } from '@/styles/Settings';
import styled from '@emotion/styled';
import React, {
  ChangeEvent,
  ForwardedRef,
  forwardRef,
  ReactElement,
} from 'react';
import { Icon } from '@/components/general/Icon';
import { Typography } from '@/components/general/Typography';
import { Tile } from '@/components/dataDisplay/Tile';
import { getSizeCheckBox } from '@/components/dataEntry/CheckBox/CheckBox';
import { IAvatar } from '@/components/dataDisplay/Avatar/Avatar';

export interface IAvatarCheckBox {
  label: string;
  avatar: ReactElement<IAvatar>;
  color?: Color;
  size?: Size;
  variant?: Variant;
  className?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

type WrapperType = Pick<IAvatarCheckBox, 'color' | 'variant'>;
const Wrapper = styled.div<WrapperType>`
  display: flex;
  flex-direction: column-reverse;
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

type VisiblePartType = Pick<IAvatarCheckBox, 'color' | 'variant' | 'size'>;
const VisiblePart = styled.label<VisiblePartType>`
  display: inline-flex;
  user-select: none;
  cursor: pointer;

  position: absolute;
  top: 0.3rem;
  left: 0.3rem;
  ${({ size }) => getSizeCheckBox(size)}
  ${({ variant, theme }) => getColors('default', variant, theme)}
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

const StyledTile = styled(Tile)`
  header {
    border-bottom: none !important;
  }
`;

export const AvatarCheckBox: React.FC<IAvatarCheckBox> = forwardRef(
  (
    {
      label,
      variant = 'outlined',
      color = 'primary',
      size = 'md',
      avatar,
      className,
      onChange,
      ...rest
    },
    ref
  ) => {
    const fieldId = useId();
    return (
      <StyledTile
        avatar={avatar}
        className="relative"
        width="8rem"
        height="8rem"
      >
        <>
          <Typography.Text size="sm">{label}</Typography.Text>
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
          </Wrapper>
        </>
      </StyledTile>
    );
  }
);

AvatarCheckBox.displayName = 'AvatarCheckBox';
