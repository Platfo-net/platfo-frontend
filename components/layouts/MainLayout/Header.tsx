import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { useTranslation } from 'next-i18next';
import { Path } from '@/constants/enums';
import styled from '@emotion/styled';
import useSticky from '@/components/hooks/useSticky';
import { Logo } from '@/components/dataDisplay/Logo';
import { getBoxShadow } from '@/styles/globals';
import { css } from '@emotion/react';
import { Typography } from '@/components/general/Typography';
import { landingMenu } from '@/constants/mainMenu';
import { Button } from '@/components/general/Button';
import { settings } from '@/styles/Settings';
import { changeTheme } from '@/stores/reducers/user';
import { store } from '@/lib/LocalStorage';
import { useAppDispatch, useAppSelector } from '@/stores/reduxHooks';
import Divider from '@/components/general/Divider/Divider';

const { Text } = Typography;

interface IHeader {
  isLoggedIn: boolean;
}

const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: absolute;
  padding: 1rem;
  &.sticky {
    position: fixed;
    top: 0;
    left: 0;
    padding: 1rem 4rem;
    animation: moveDown 0.5s ease-in-out;
    z-index: 99;
    ${({ theme }) =>
      getBoxShadow(theme.components.shadow1, theme.components.shadow2)};
    ${({ theme }) => css`
      background: ${theme.components.background};
    `}
  }

  @keyframes moveDown {
    from {
      transform: translateY(-5rem);
    }
    to {
      transform: translateY(0rem);
    }
  }
`;

const WrapperLogo = styled.div`
  a {
    display: flex;
    span {
      margin: auto 1rem;
    }
    svg {
      animation: rotate 0.7s ease-in-out 0.5s;
    }
  }

  @keyframes rotate {
    0% {
      transform: rotateY(360deg);
    }
    100% {
      transform: rotateY(0rem);
    }
  }
`;

const WrapperMenu = styled.div`
  display: flex;
  a {
    margin: 0.5rem 1rem;
    transition: ${settings.transition};
    &:hover,
    &.active {
      border-bottom: 4px solid ${({ theme }) => theme.components.secondary};
    }
  }
`;

const WrapperAction = styled.div`
  display: flex;
  margin: auto 0;
`;

const Header: FC<IHeader> = ({ isLoggedIn }) => {
  const { isDark } = useAppSelector((state) => ({
    isDark: state.user.isDark,
  }));
  const dispatch = useAppDispatch();
  const { isSticky, element } = useSticky();
  const router = useRouter();
  const { t } = useTranslation('common');
  const headerClasses = ` ${isSticky ? 'sticky' : ''}`;

  const changeRoute = (path: Path) => {
    router.push(path);
  };

  const changeThemeMode = () => {
    const newTheme = isDark ? 'light' : 'dark';
    dispatch(changeTheme(!isDark));
    store('theme', newTheme);
  };

  return (
    <StyledHeader ref={element} className={headerClasses}>
      <WrapperLogo>
        <Link href="/">
          <Logo size={3} />
          <Text size="lg" weight="semiBold">
            Botinow
          </Text>
        </Link>
      </WrapperLogo>
      <WrapperMenu>
        {landingMenu.map((menu) => (
          <Link
            href={menu.path}
            key={menu.key}
            className={router.pathname == menu.path ? 'active' : ''}
          >
            {t(menu.key)}
          </Link>
        ))}
      </WrapperMenu>
      <WrapperAction>
        <Button
          color="primary"
          icon={isDark ? 'Sun' : 'Moon'}
          isIconOnly
          onClick={changeThemeMode}
          size="lg"
          title="Button"
          type="button"
          variant="text"
          className="!mx-3"
        />
        <Divider isVertical={true} height={'20px'} className="m-auto" />
        {isLoggedIn ? (
          <Button
            title={t('Dashboard')}
            color="secondary"
            onClick={() => changeRoute(Path.Accounts)}
            size="sm"
          />
        ) : (
          <>
            <Button
              title={t('login')}
              variant="text"
              onClick={() => changeRoute(Path.Login)}
              size="sm"
            />
            <Button
              title={t('register')}
              color="secondary"
              onClick={() => changeRoute(Path.Register)}
              size="sm"
            />
          </>
        )}
      </WrapperAction>
    </StyledHeader>
  );
};

export default Header;
