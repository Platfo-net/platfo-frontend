import { NextPage } from 'next';
import React, { ReactNode, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/dataDisplay/Logo';
import { ThemeProvider } from '@emotion/react';
import { Themes } from '@/styles/Themes';
import { store } from '@/lib/LocalStorage';
import { getIsDark, setThemeSettingInHtml } from '@/styles/globals';
import { Tile } from '@/components/dataDisplay/Tile';
import { Button } from '@/components/general/Button';
import Head from 'next/head';
import { Meta } from '@/types/global';
import { useAppDispatch, useAppSelector } from '@/stores/reduxHooks';
import { changeTheme } from '@/stores/reducers/user';

interface IAuthLayout {
  children: ReactNode;
  meta: Meta;
}
export const AuthLayout: NextPage<IAuthLayout> = ({ children, meta }) => {
  const { isDark } = useAppSelector((state) => ({
    isDark: state.user.isDark,
  }));
  const dispatch = useAppDispatch();

  const changeThemeMode = () => {
    const newTheme = isDark ? 'light' : 'dark';
    dispatch(changeTheme(!isDark));
    store('theme', newTheme);
  };

  /* Todo add change language
  const changeLanguage = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };
    const changeTo = router.locale === 'en' ? 'fa' : 'en';
  */

  const addThemeSettingInHtml = useCallback(() => {
    const isDarkMode = getIsDark();
    dispatch(changeTheme(isDarkMode));
    setThemeSettingInHtml();
  }, [dispatch]);

  useEffect(() => {
    if (window !== undefined) {
      addThemeSettingInHtml();
    }
  }, [addThemeSettingInHtml, isDark]);

  const theme = Themes[isDark ? 'dark' : 'light'];

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
      </Head>
      <div className={`flex w-screen h-screen  bg-[#70d3ba] dark:bg-[#131517]`}>
        <Tile className="m-auto max-w-md">
          <div className="flex flex-col w-full">
            <Link href="/">
              <span className="block mx-auto my-8 w-fit">
                <Logo size={9} />
              </span>
            </Link>
            {children}
          </div>
        </Tile>
        <div>
          <Button
            color="primary"
            icon={isDark ? 'Sun' : 'Moon'}
            isIconOnly
            onClick={changeThemeMode}
            size="lg"
            title="Button"
            type="button"
            variant="text"
          />
          {/*TODO: language icon and test rtl*/}
          {/*<Button*/}
          {/*  color="primary"*/}
          {/*  icon={'Sun'}*/}
          {/*  isIconOnly*/}
          {/*  onClick={() => changeLanguage(changeTo)}*/}
          {/*  size="lg"*/}
          {/*  title="Button"*/}
          {/*  type="button"*/}
          {/*  variant="text"*/}
          {/*/>*/}
        </div>
      </div>
    </ThemeProvider>
  );
};
