// Add bootstrap css
import "bootstrap/dist/css/bootstrap.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { MoralisProvider } from "react-moralis";

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);
  
  return (
    <MoralisProvider
      appId={process.env.NEXT_PUBLIC_MORALIS_APP_ID}
      serverUrl={process.env.NEXT_PUBLIC_MORALIS_SERVER_URL}
    >
      <Component {...pageProps} />
    </MoralisProvider>
  );
};

export default App;
