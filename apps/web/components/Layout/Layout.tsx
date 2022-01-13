import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useWeb3ExecuteFunction } from "react-moralis";
import styles from "../../styles/index.module.css";
import { createWalletFactoryOptions } from "../../utils/web3";
import WalletSidebar from "./WalletSidebar";

const Layout = ({ children }) => {
  const { fetch } = useWeb3ExecuteFunction();
  const {
    data: wallets,
    fetch: walletFetch,
    isLoading: walletIsLoading,
  } = useWeb3ExecuteFunction();
  const [walletIndex, setWalletIndex] = useState(0);
  const router = useRouter();

  const printWallet = useCallback(async () => {
    await fetch({
      params: createWalletFactoryOptions("wallets", {
        "": walletIndex,
      }),
      onSuccess: (results) => console.log("[Dev]: ", results),
    });
  }, []);

  useEffect(() => {
    walletFetch({
      params: createWalletFactoryOptions("getWallets", {}),
      onError: (e) => console.error(e),
    });
  }, []);

  return (
    <div className={styles.sideBarAndContent}>
      <div className={styles.sideBar}>
        <button className={styles.sideBarTab} onClick={() => router.push("/")}>
          Home
        </button>
        <WalletSidebar
          wallets={wallets as string[] | null}
          isLoading={walletIsLoading}
        />
        <button
          className={styles.sideBarTab}
          onClick={() => router.push("/wallet/new")}
        >
          Create New Wallet
        </button>
      </div>
      <div className={styles.content}>
        {children}
        <div className={styles.testing}>
          <p>For dev testing only:</p>
          <input
            onChange={(e) => setWalletIndex(+e.target.value)}
            placeholder="Wallet index"
          />
          <button onClick={printWallet}>Print wallets</button>
        </div>
      </div>
    </div>
  );
};

export default Layout;
