import { read } from '@/lib/LocalStorage';
import { settings } from '@/styles/Settings';
import { AppTheme, Themes } from '@/styles/Themes';
import { css, SerializedStyles } from '@emotion/react';

/****************************
 * *** Global Style Types ***
 ****************************/
export type Size = 'sm' | 'md' | 'lg';
export type Variant = 'text' | 'contained' | 'outlined';

export const colorOptions = [
  'default',
  'primary',
  'secondary',
  'accent',
  'warning',
  'danger',
  'success',
  'chatbot',
  'liveChat',
  'postman',
] as const;
export type Color = typeof colorOptions[number];
export const typographySizeOptions = {
  xs: '10px',
  sm: '12px',
  base: '14px',
  md: '16px',
  lg: '18px',
  xl: '20px',
  '2xl': '22px',
  '3xl': '24px',
  '4xl': '26px',
  '5xl': '28px',
  '6xl': '30px',
};
export type TypographySize = keyof typeof typographySizeOptions;

export const typographyWeightOptions = {
  light: '300',
  normal: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
  black: '900',
};
export const textColorOptions = [
  'regular',
  'nonActive',
  'placeholder',
  'warning',
  'success',
  'danger',
  'currentColor',
] as const;
export type TextColor = typeof textColorOptions[number];
/********************************
 * *** Global Style Functions ***
 ********************************/
export const GlobalStyles = css`
  html,
  body {
    font-family: ${settings.fontFamily};
    padding: 0;
    margin: 0;
    background-color: var(--themeBackgroundColor);
    color: var(--themeColor);
  }
`;

export const getBoxShadow = (
  shadowColor1: string,
  shadowColor2: string,
  inset = false
) => {
  const insetStr = inset ? 'inset' : '';
  return css`
    box-shadow: ${insetStr} 0px 7px 28px ${shadowColor1},
      ${insetStr} 0px 6px 10px ${shadowColor2};
  `;
};

export const getTileSize = (
  width?: string,
  height?: string
): SerializedStyles => css`
  width: ${width};
  height: ${height};
  border-radius: ${settings.borderRadius_lg};
`;

export const getSize = (size?: Size, width?: string): SerializedStyles => {
  if (size === 'sm') {
    return css`
      width: ${width ? width : '5rem'};
      height: ${settings.elementHeight_sm};
      font-size: ${typographySizeOptions.sm};
      border-radius: ${settings.borderRadius_sm};
    `;
  }
  if (size === 'md') {
    return css`
      width: ${width ? width : '10rem'};
      height: ${settings.elementHeight_md};
      font-size: ${typographySizeOptions.base};
      border-radius: ${settings.borderRadius_md};
    `;
  }
  if (size === 'lg') {
    return css`
      width: ${width ? width : '15rem'};
      height: ${settings.elementHeight_lg};
      font-size: ${typographySizeOptions.lg};
      border-radius: ${settings.borderRadius_lg};
    `;
  }
  return css``;
};

export const getColors = (
  color: Color = 'default',
  variant: Variant = 'text',
  theme?: AppTheme
): SerializedStyles => {
  return css`
    background-color: ${variant === 'contained'
      ? theme?.components[color]
      : 'transparent'};
    color: ${variant === 'contained'
      ? theme?.font.button
      : theme?.components[color]};
    border: ${variant !== 'text'
      ? `1px solid ${theme?.components[color]}`
      : 'none'};
    &:hover:not([disabled]) {
      filter: brightness(110%);
      color: ${variant === 'contained' ? theme?.font.button : ``};
    }
    &:disabled {
      cursor: not-allowed;
      background-color: ${variant === 'contained'
        ? theme?.components.nonActive
        : 'transparent'};
      color: ${variant === 'contained'
        ? theme?.font.nonActive
        : theme?.components.nonActive};
      border: ${variant !== 'text'
        ? `1px solid ${theme?.components.nonActive}`
        : 'none'};
      box-shadow: none;
    }
  `;
};

export const getIsDark = (): boolean => {
  const theme = read('theme');
  const themeExistsInStorage = Boolean(theme !== null);
  return themeExistsInStorage
    ? Boolean(theme === 'dark')
    : window.matchMedia('(prefers-color-scheme: dark)').matches;
};

export const getIsRtl = (): boolean => {
  return (
    typeof document !== 'undefined' &&
    document.documentElement &&
    document.documentElement.getAttribute('dir') === 'rtl'
  );
};

export const setThemeSettingInHtml = () => {
  const theme = read('theme');

  theme === 'dark'
    ? document.documentElement.classList.add('dark')
    : document.documentElement.classList.remove('dark');

  const backgroundColor =
    theme === 'dark' ? Themes.dark.background : Themes.light.background;
  const textColor =
    theme === 'dark' ? Themes.dark.font.regular : Themes.light.font.regular;

  document.documentElement.style.setProperty(
    '--themeBackgroundColor',
    backgroundColor
  );
  document.documentElement.style.setProperty('--themeColor', textColor);
};

export const setLanguageDirection = (locale: string) => {
  let direction = locale === 'fa' ? 'rtl' : 'ltr';
  let fontFamily =
    locale === 'fa' ? settings.fontFamilyFa : settings.fontFamily;

  const html = document.querySelector('html') as HTMLHtmlElement;
  html.setAttribute('dir', direction);

  const body = document.querySelector('body') as HTMLBodyElement;
  body.style.direction = direction;
  body.style.fontFamily = fontFamily;
};
