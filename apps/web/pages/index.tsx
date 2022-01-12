import Image from "next/image";
import React, { useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { Web3Provider } from "react-moralis/lib/hooks/core/useMoralis/_useMoralisWeb3";
import HomeImg from "../assets/home_image.jpeg";
import styles from "../styles/index.module.css";
import { createWalletFactoryOptions } from "../utils/web3";
import Content from '../components/Content';

// so typescript doesn't give an error for window.ethereum
declare global {
  interface Window {
    ethereum: any;
  }
}

const connectors: {
  title: string;
  connectorId?: Web3Provider;
  priority: number;
}[] = [
  {
    title: "Metamask",
    priority: 1,
  },
  {
    title: "WalletConnect",
    connectorId: "walletconnect",
    priority: 2,
  },
  {
    title: "Trust Wallet",
    priority: 3,
  },
];

const Homepage = () => {
  const [walletIndex, setWalletIndex] = useState(0);
  const { authenticate, isAuthenticated, user } = useMoralis();
  const { data, error, fetch } = useWeb3ExecuteFunction();
  
  const printWallet = async () => {
    await fetch({
      params: createWalletFactoryOptions("wallets", {
        "": walletIndex,
      }),
      onError: (e) => console.error(e),
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="d-flex align-items-center justify-content-center flex-column">
        <div className="display-4 m-5">Multi-Signature Wallet</div>
        <Image
          className="img-thumbnail"
          src={HomeImg}
          width="800px"
          height="500px"
          alt="image thumbnail"
          layout="fixed"
        />
        <div className="d-flex align-items-center justify-content-center">
          {connectors.map(({ title, connectorId }, key) => (
            <button
              className="btn btn-secondary m-5"
              key={key}
              onClick={async () => {
                try {
                  await authenticate({ provider: connectorId });
                  window.localStorage.setItem("connectorId", connectorId);
                } catch (e) {
                  console.error(e);
                }
              }}
            >
              {title}
            </button>
          ))}
        </div>
      </div>
    );
  }

    return (
      <div>
        <div className={styles.background}>
          <div className={styles.header}></div>
          <div className={styles.sideBarAndContent}>
            <Content />
          </div>
        </div>
      </div>
    );
};

export default Homepage;
