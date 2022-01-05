import React, { useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { Web3Provider } from "react-moralis/lib/hooks/core/useMoralis/_useMoralisWeb3";
import WalletFactory from "../../contracts/artifacts/contracts/MultiSigWalletFactory.sol/MultiSigWalletFactory.json";
import MyWalletsComponent from "../components/MyWalletsComponent";
import NewWalletForm from "../components/NewWalletForm";
import UserHeader from "../components/UserHeader";
import WalletExplanation from "../components/WalletExplanation";
import styles from "../styles/index.module.css";
import HomeImg from "../assets/home_image.jpeg";
import Image from "next/image";
import {
  createWalletFactoryOptions,
  walletFactoryAddress,
} from "../utils/web3";

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
  const { authenticate, isAuthenticated } = useMoralis();
  const { data, fetch, error } = useWeb3ExecuteFunction();

  console.log("[address]:", data);

  const printWallet = () => {
    fetch({
      params: createWalletFactoryOptions("wallets", {
        "": walletIndex,
      }),
    });
    console.log(error);
  };

  if (!isAuthenticated) {
    return (
      <div className="d-flex align-items-center justify-content-center flex-column">
        <div className="display-4 m-5">Multi-Signature Wallet</div>
        <Image className="img-thumbnail" src={HomeImg} width = "800px" height = "500px" layout="fixed" />
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
        <div className={styles.content}>
          <UserHeader />
          <WalletExplanation />
          <NewWalletForm />
          <MyWalletsComponent />
          <div className={styles.testing}>
            <p>For dev testing only:</p>
            <input
              onChange={(e) => setWalletIndex(+e.target.value)}
              placeholder="Wallet index"
            />
            <button onClick={() => printWallet()}>Print wallets</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
