import Document, { Html, Head, Main, NextScript } from 'next/document';
import i18nextConfig from '../next-i18next.config';
import { GlobalStyles } from '@/styles/globals';
import { Global } from '@emotion/react';

class MyDocument extends Document {
  render() {
    const currentLocale =
      this.props.__NEXT_DATA__.locale || i18nextConfig.i18n.defaultLocale;

    const setInitialTheme = `
    var theme = localStorage.getItem("theme");
    var themeExistsInStorage = Boolean(theme !== null);

    var isDark = themeExistsInStorage ?
      Boolean(theme === "dark") :
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    var backgroundColor = isDark ? "#131517" : "#ffffff";
    var textColor = isDark ? "#E4EBF5e6" : "#504e55e6";

    document.documentElement.style.setProperty("--themeBackgroundColor", backgroundColor);
    document.documentElement.style.setProperty("--themeColor", textColor);
  `;

    return (
      <Html lang={currentLocale}>
        <Head>
          <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
          <Global styles={GlobalStyles} />
          <meta
            name="facebook-domain-verification"
            content="7a2nqcelnwc5f7l2j8fpcldnbzoaja"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
