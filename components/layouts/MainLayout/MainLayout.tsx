import React, { FC, ReactNode, useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { IMenu, Meta } from '@/types/global';
import { css, ThemeProvider } from '@emotion/react';
import { getIsDark, setThemeSettingInHtml } from '@/styles/globals';
import { Themes } from '@/styles/Themes';
import { tokenObj } from '@/lib/token';
import { changeTheme } from '@/stores/reducers/user';
import { useAppDispatch, useAppSelector } from '@/stores/reduxHooks';
import styled from '@emotion/styled';
import Header from '@/components/layouts/MainLayout/Header';
import { Path } from '@/constants/enums';

interface IMainLayout {
  children: ReactNode;
  meta: Meta;
  topMenu?: IMenu[];
  className?: string;
}

const Content = styled.main`
  height: 100%;
  position: relative;
  margin-top: 5rem;
  ${({ theme }) => css`
    background: ${theme.background};
  `}
`;

export const MainLayout: FC<IMainLayout> = ({ children, meta }) => {
  const { isDark } = useAppSelector((state) => ({
    isDark: state.user.isDark,
  }));
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkAuthentication = useCallback(() => {
    const token = tokenObj.getAccessToken();
    setIsLoggedIn(Boolean(token));
  }, []);

  const addThemeSettingInHtml = useCallback(() => {
    const isDarkMode = getIsDark();
    dispatch(changeTheme(isDarkMode));
    setThemeSettingInHtml();
  }, [dispatch]);

  useEffect(() => {
    if (window !== undefined) {
      addThemeSettingInHtml();
      checkAuthentication();
    }
  }, [addThemeSettingInHtml, checkAuthentication, isDark]);

  const theme = Themes[isDark ? 'dark' : 'light'];

  useEffect(() => {
    router.push(Path.Login);
  }, [router]);

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </Head>

      <div
        className={`flex flex-col w-screen h-screen bg-[#ffffff] dark:bg-[#1e1f25] `}
      >
        <div className="h-full w-11/12 m-auto relative inline-flex">
          <Header isLoggedIn={isLoggedIn} />
          <Content>{children}</Content>
          {/*<LandingFooter />*/}
        </div>
      </div>
    </ThemeProvider>
  );
};
