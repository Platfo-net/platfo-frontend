import '../styles/globals.css';
import { ThemeProvider, Global } from '@emotion/react';
import { Themes } from '../styles/Themes';
import { GlobalStyles } from '../styles/globals';

const BREAKPOINTS_INT = {
  xs: 375,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};
const customViewports = Object.fromEntries(
  Object.entries(BREAKPOINTS_INT).map(([key, val], idx) => {
    return [
      key,
      {
        name: key,
        styles: {
          width: `${val}px`,
          height: `${(idx + 5) * 10}vh`,
        },
      },
    ];
  })
);

const withThemeProvider = (Story, context) => {
  const background =
    context.globals.backgrounds?.value || parameters.backgrounds.defaultColor;
  const theme = Object.values(Themes).find(
    (theme) => theme.background === background
  );

  return (
    <ThemeProvider theme={theme}>
      <Story {...context} />
    </ThemeProvider>
  );
};

const withGlobalStyles = (Story, context) => (
  <>
    <Global styles={GlobalStyles} />
    <Story {...context} />
  </>
);

export const decorators = [withThemeProvider, withGlobalStyles];

export const parameters = {
  backgrounds: {
    default: 'light',
    defaultColor: Themes.light.background,
    values: [
      {
        name: 'dark',
        value: Themes.dark.background,
      },
      {
        name: 'light',
        value: Themes.light.background,
      },
    ],
  },
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextRouter: {
    query: {
      foo: 'this-is-a-global-override',
    },
  },
  viewport: { viewports: customViewports },
};
