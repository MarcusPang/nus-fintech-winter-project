import React, { useState, useEffect } from "react";
import { useMoralis, useWeb3ExecuteFunction, useMoralisQuery } from "react-moralis";
import Wallet from "../components/Wallet";
import NewWalletForm from "../components/NewWalletForm";
import UserHeader from "../components/UserHeader";
import WalletExplanation from "../components/WalletExplanation";
import styles from "../styles/index.module.css";
import { walletFactoryOptions } from "../utils/web3";

const contentType = {
  "HOME": "home",
  "NEWWALLET": "newWallet",
  "WALLET": "wallet"
}

function showContent(content, wallet) {
  if (content == contentType.HOME) {
    return <div><UserHeader /><WalletExplanation /></div>;
  } else if (content == contentType.NEWWALLET) {
    return <div><NewWalletForm /></div>;
  } else { //must be wallet
    return <Wallet wallet={wallet} />
  }
}

const Content = () => {
  const { fetch } = useWeb3ExecuteFunction();
  const [walletIndex, setWalletIndex] = useState(0);
  const [content, toggleContent] = useState(contentType.HOME);
  const [wallet, saveWallet] = useState(null);
  const { user } = useMoralis();
  const {
    data: walletData,
    error: walletError,
    isFetching: walletIsFetching,
    fetch: walletFetch,
  } = useMoralisQuery("MultiSigWallet", (query) =>
    query.equalTo("walletCreator", user.get("ethAddress")) //this should be checking whether user is inside walletOwners instead of walletCreator right
  ); 

  useEffect(() => {
    walletFetch();
    console.log('data in index.tsx 1', walletData);
  }, [walletData, walletFetch]);
  
  const printWallet = async () => {
    await fetch({
      params: walletFactoryOptions("wallets", {
        "": walletIndex,
      }),
    });
  };

  return (
    <div className={styles.sideBarAndContent}>
      <div className={styles.sideBar}>
        <button className={styles.sideBarTab} onClick={() => {
          toggleContent(contentType.HOME);
          }}>Home</button>
        {walletData.map((wallet, key) => (
          <button className={styles.sideBarTab}
          key={key}
          onClick={() => {
            toggleContent(contentType.WALLET);
            saveWallet(wallet);
            }}>{wallet.id}</button>
        ))} 
        <button className={styles.sideBarTab} onClick={() => {
            toggleContent(contentType.NEWWALLET)
          }}>Create New Wallet</button>
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
