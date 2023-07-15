import React, { FC, ReactNode, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { IMenu, Meta } from '@/types/global';
import { css, ThemeProvider } from '@emotion/react';
import { getIsDark, getIsRtl, setThemeSettingInHtml } from '@/styles/globals';
import { Themes } from '@/styles/Themes';
import { Path } from '@/constants/enums';
import { tokenObj } from '@/lib/token';
import Sidebar from '@/components/layouts/DashboardLayout/Sidebar';
import { changeTheme } from '@/stores/reducers/user';
import { useAppDispatch, useAppSelector } from '@/stores/reduxHooks';
import { TopBar } from '@/components/layouts/DashboardLayout/TopBar';
import styled from '@emotion/styled';
import { settings } from '@/styles/Settings';
import Script from 'next/script';

interface IDashboardLayout {
  children: ReactNode;
  meta: Meta;
  topMenu?: IMenu[];
  color?: 'secondary' | 'chatbot' | 'liveChat' | 'postman';
  className?: string;
}

const isRtl = getIsRtl();

const Content = styled.main`
  height: 100%;
  position: relative;
  z-index: 60;
  padding: 0.8rem;
  overflow: auto;
  ${({ theme }) => css`
    background: ${theme.components.background};
    border-radius: ${isRtl
      ? `0 ${settings.borderRadius_xlg} ${settings.borderRadius_xlg} 0`
      : `${settings.borderRadius_xlg} 0 0 ${settings.borderRadius_xlg}`};
  `}
`;

export const DashboardLayout: FC<IDashboardLayout> = ({
  children,
  meta,
  topMenu,
  color,
}) => {
  const router = useRouter();
  const { isDark } = useAppSelector((state) => ({
    isDark: state.user.isDark,
  }));
  const dispatch = useAppDispatch();

  const checkAuthentication = useCallback(() => {
    const token = tokenObj.getAccessToken();
    if (!token) {
      router.push(Path.Login);
    }
  }, [router]);
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

  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '551990259962247',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v14.0',
      });
    };
  }, []);

  const theme = Themes[isDark ? 'dark' : 'light'];

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </Head>

      <div className={`flex w-screen h-screen bg-[#ffffff] dark:bg-[#1e1f25]`}>
        <Sidebar />
        <div className="flex flex-col w-full relative">
          {topMenu && <TopBar data={topMenu} color={color} />}
          <Content>{children}</Content>
        </div>
      </div>
      <Script
        async
        defer
        crossOrigin="anonymous"
        src="https://connect.facebook.net/en_US/sdk.js"
      />
    </ThemeProvider>
  );
};
