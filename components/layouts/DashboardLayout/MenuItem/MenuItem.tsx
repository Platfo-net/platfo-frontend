import React from 'react';
import { IMenu } from '@/types/global';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { getIsRtl } from '@/styles/globals';
import { css } from '@emotion/react';
import { Icon } from '@/components/general/Icon';
import { Button } from '@/components/general/Button';
import { useAppDispatch, useAppSelector } from '@/stores/reduxHooks';
import { logout } from '@/stores/reducers/auth';
import { Path } from '@/constants/enums';
import { store } from '@/lib/LocalStorage';
import { changeTheme } from '@/stores/reducers/user';

export interface IMenuItem {
  data: IMenu;
}

const isRtl = getIsRtl();

const Wrapper = styled.div<IMenuItem>`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20px 0;
  border-right-width: 4px;
  border-left-width: 4px;
  border-left-style: solid;
  border-right-style: solid;
  cursor: ${({ data }) => (data.isDisable ? 'not-allowed' : 'pointer')};
  ${({ theme, data }) => css`
    opacity: ${data.isDisable ? '0.3' : '1'};
    border-right-color: ${theme.background};
    border-left-color: ${theme.background};
  `}

  &:hover, &.active {
    ${({ theme, data }) => css`
      color: ${data.isDisable
        ? 'inherit'
        : data.color && theme.components[data.color]};
      border: ${data.isDisable ? 'none' : ''};
      border-left-color: ${isRtl
        ? data.color && theme.components[data.color]
        : theme.background};
      border-right-color: ${isRtl
        ? theme.background
        : data.color && theme.components[data.color]};
    `}
  }
`;

const StyledButton = styled(Button)`
  padding: 20px 0;
  border-right-width: 4px;
  border-left-width: 4px;
  border-left-style: solid;
  border-right-style: solid;
  border-radius: 0;
  transition: unset;
  svg {
    color: ${({ theme }) => theme.font.regular};
    width: 30px;
    height: 30px;
  }
  ${({ theme, isDisable }) => css`
    opacity: ${isDisable ? '0.3' : '1'};
    color: ${theme.font.regular};
    border-right-color: ${theme.background};
    border-left-color: ${theme.background};
  `}

  &:hover,
  &.active {
    ${({ theme, color = 'secondary', isDisable }) => css`
      color: ${isDisable ? 'inherit' : theme.components[color]};
      border-left-color: ${isRtl ? theme.components[color] : theme.background};
      border-right-color: ${isRtl ? theme.background : theme.components[color]};
    `}
    svg {
      color: ${({ theme, color = 'secondary', isDisable }) =>
        isDisable ? 'inherit' : theme.components[color]};
    }
  }
`;

const MenuItem: React.FC<IMenuItem> = ({ data }) => {
  const { isDark } = useAppSelector((state) => ({
    isDark: state.user.isDark,
  }));
  const router = useRouter();
  const dispatch = useAppDispatch();

  const onClick = (key: string) => {
    if (key === 'logout') {
      dispatch(logout());
      router.push(Path.Login);
    }
    if (key === 'theme') {
      store('theme', isDark ? 'light' : 'dark');
      dispatch(changeTheme(!isDark));
    }
  };

  const getItem = () => {
    return (
      <Wrapper
        className={router.pathname.includes(data.path) ? 'active' : ''}
        data={data}
      >
        {data.icon && <Icon name={data.icon} color={'inherit'} size="6xl" />}
      </Wrapper>
    );
  };

  if (data.type === 'link') {
    return (
      <>
        {!data.isDisable ? (
          <Link href={data.path}>{getItem()}</Link>
        ) : (
          getItem()
        )}
      </>
    );
  }
  if (data.type === 'button') {
    return (
      <StyledButton
        color={data.color}
        isDisable={data.isDisable}
        onClick={() => onClick(data.key)}
        title=""
        isIconOnly={true}
        icon={data.icon}
        type="button"
        variant="text"
        className={router.pathname.includes(data.path) ? 'active' : ''}
      />
    );
  }
  return null;
};

export default MenuItem;
