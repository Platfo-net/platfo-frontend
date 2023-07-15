import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { settings } from '@/styles/Settings';

export interface IDropdown {
  isVisible: boolean;
  left?: number;
  header?: ReactNode;
  children?: ReactNode;
}

type WrapperType = Pick<IDropdown, 'isVisible' | 'left'>;
const Wrapper = styled.div<WrapperType>`
  position: absolute;
  z-index: 100;

  top: 60px;
  min-height: 10px;
  min-width: 10px;
  width: 280px;
  animation-name: fadeInDown;
  animation-duration: 500ms;
  animation-fill-mode: both;
  ${({ isVisible, left = 0 }) => css`
    display: ${isVisible ? 'block' : 'none'};
    left: -${left}px;
  `};

  @keyframes fadeInDown {
    0% {
      opacity: 0;
      transform: translate3d(0, -10%, 0);
    }
    100% {
      opacity: 1;
      transform: none;
    }
  }
`;

const Header = styled.div`
  padding: 15px;
  position: relative;
  text-align: center;
  font-weight: bold;
  border-radius: ${settings.borderRadius_md}  ${settings.borderRadius_md} 0 0;
  border: none;
  box-shadow: 0 2px 10px -2px #cedae0;
  ${({ theme }) => css`
    background: ${theme.background};
    color: ${theme.font.regular};
  `}
}
`;

type TriangleType = Pick<IDropdown, 'left'>;

const Triangle = styled.span<TriangleType>`
  position: absolute;
  top: -8px;
  height: 15px;
  width: 15px;
  border-radius: ${settings.borderRadius_sm} 0 0 0;
  transform: rotate(45deg);
  ${({ theme, left = 135 }) => css`
    background: ${theme.background};
    left: ${left}px;
  `}
`;

const Body = styled.div`
  max-height: 292px;
  overflow-y: auto;
  overflow-x: hidden;
  ${({ theme }) => css`
    background: ${theme.components.background};
  `}
`;

const Dropdown: React.FC<IDropdown> = ({
  isVisible,
  left = 0,
  header,
  children,
}) => {
  return (
    <Wrapper isVisible={isVisible}>
      <Header>
        <Triangle left={left} />
        {header}
      </Header>
      <Body>{children}</Body>
    </Wrapper>
  );
};

export default Dropdown;
