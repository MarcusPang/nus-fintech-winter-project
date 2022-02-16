import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import { MoralisProvider } from "react-moralis";
import Head from "next/head";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicons/favicon-16.png" sizes="16x16" />
        <link rel="icon" href="/favicons/favicon-32.png" sizes="32x32" />
        <link rel="icon" href="/favicons/favicon-57.png" sizes="57x57" />
        <link rel="icon" href="/favicons/favicon-76.png" sizes="76x76" />
        <link rel="icon" href="/favicons/favicon-96.png" sizes="96x96" />
        <link rel="icon" href="/favicons/favicon-120.png" sizes="120x120" />
        <link rel="icon" href="/favicons/favicon-128.png" sizes="128x128" />
        <link rel="icon" href="/favicons/favicon-144.png" sizes="144x144" />
        <link rel="icon" href="/favicons/favicon-152.png" sizes="152x152" />
        <link rel="icon" href="/favicons/favicon-180.png" sizes="180x180" />
        <link rel="icon" href="/favicons/favicon-192.png" sizes="192x192" />

        <link
          rel="apple-touch-icon-precomposed"
          href="/favicons/apple-touch-icon-precomposed-180.png"
          sizes="180x180"
        />
        <link rel="mask-icon" href="/favicons/icon-mask.svg" color="#ffffff" />

        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
          name="msapplication-TileImage"
          content="/favicons/msapplication/mediumtile-144.png"
        />

        <meta name="application-name" content="multisigwallet" />
        <meta name="msapplication-tooltip" content="multisigwallet" />
        <meta
          name="msapplication-config"
          content="/favicons/msapplication/ieconfig.xml"
        />
      </Head>
      <MoralisProvider
        appId={process.env.MORALIS_APP_ID}
        serverUrl={process.env.MORALIS_SERVER_URL}
      >
        <Component {...pageProps} />
      </MoralisProvider>
    </>
  );
};

export default App;
