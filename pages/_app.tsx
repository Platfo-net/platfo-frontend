import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import "../styles/index.scss";
import store from "../stores/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Script from "next/script";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    let dir = router.locale === "fa-IR" ? "rtl" : "ltr";
    document.querySelector("html").setAttribute("dir", dir);
    document.querySelector("body").style.direction = dir;
  }, [router.locale]);

  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "551990259962247",
        autoLogAppEvents: true,
        xfbml: true,
        version: "v14.0",
      });
    };
  }, []);

  return (
    <Provider store={store}>
      <Head>
        <meta
          name="facebook-domain-verification"
          content="7a2nqcelnwc5f7l2j8fpcldnbzoaja"
        />
      </Head>
      <Component {...pageProps} />
      <Script
        async
        defer
        crossOrigin="anonymous"
        src="https://connect.facebook.net/en_US/sdk.js"
      />
    </Provider>
  );
}

export default MyApp;
