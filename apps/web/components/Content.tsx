import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import NewWalletForm from "../components/NewWalletForm";
import UserHeader from "../components/UserHeader";
import Wallet from "../components/Wallet";
import WalletExplanation from "../components/WalletExplanation";
import styles from "../styles/index.module.css";
import { createWalletFactoryOptions } from "../utils/web3";

const contentType = {
  HOME: "home",
  NEWWALLET: "newWallet",
  WALLET: "wallet",
};

function showContent(content: string, wallet: string) {
  if (content == contentType.HOME) {
    return (
      <div>
        <UserHeader />
        <WalletExplanation />
      </div>
    );
  } else if (content == contentType.NEWWALLET) {
    return <NewWalletForm />;
  } else {
    //must be wallet
    return <Wallet wallet={wallet} />;
  }
}

const Content = () => {
  const { fetch, isLoading, data } = useWeb3ExecuteFunction();
  const [walletIndex, setWalletIndex] = useState(0);
  const [content, toggleContent] = useState(contentType.HOME);
  const [wallet, saveWallet] = useState("");
  const [wallets, setWallets] = useState<string[]>([]);
  const router = useRouter();

  const walletFetch = useCallback(async () => {
    await fetch({
      params: createWalletFactoryOptions("getWallets", {}),
      onError: (error) => console.error(error),
      onSuccess: (results) => {
        setWallets(results as string[]);
        console.log("[Wallets]: ", results);
      },
    });
  }, []);

  const printWallet = useCallback(async () => {
    await fetch({
      params: createWalletFactoryOptions("wallets", {
        "": walletIndex,
      }),
      onSuccess: (results) => console.log("[Dev]: ", results),
    });
  }, []);

  useEffect(() => {
    walletFetch();
  }, [walletFetch]);

  return (
    <div className={styles.sideBarAndContent}>
      <div className={styles.sideBar}>
        <button
          className={styles.sideBarTab}
          onClick={() => {
            toggleContent(contentType.HOME);
          }}
        >
          Home
        </button>
        {!isLoading &&
          wallets &&
          (wallets as string[]).map((wallet, key) => (
            <button
              className={styles.sideBarTab}
              key={key}
              onClick={() => {
                toggleContent(contentType.WALLET);
                saveWallet(wallet);
              }}
            >
              {wallet.substring(0, 10) + "..."}
            </button>
          ))}
        <button
          className={styles.sideBarTab}
          onClick={() => {
            toggleContent(contentType.NEWWALLET);
          }}
        >
          Create New Wallet
        </button>
      </div>
      <div className={styles.content}>
        {showContent(content, wallet)}
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

export default Content;
