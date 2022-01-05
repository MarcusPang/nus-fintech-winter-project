import { useState } from "react";
import { useMoralis, useNativeBalance } from "react-moralis";
import { Web3Provider } from "react-moralis/lib/hooks/core/useMoralis/_useMoralisWeb3";
import { getWallets } from "../utils/web3";
import NewWalletForm from "../components/NewWalletForm";
import UserHeader from "../components/UserHeader";
import WalletExplanation from "../components/WalletExplanation";
import styles from '../styles/index.module.css';
import MyWalletsComponent from "../components/MyWalletsComponent";

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

  if (!isAuthenticated) {
    return (
      <div>
        {connectors.map(({ title, connectorId }, key) => (
          <button
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
            <button onClick={() => getWallets(walletIndex)}>Print wallets</button>
          </div>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div>
  //     <h1>Web</h1>
  //     <br />
  //     <button onClick={getOwners}>get owners</button>
  //     <button onClick={getTransactions}>get transactions</button>
  //     <button onClick={() => submitTransaction(userAccount, amount)}>
  //       submit transaction
  //     </button>
  //     <button onClick={() => confirmTransaction(transactionIndex)}>
  //       confirm transaction
  //     </button>
  //     <input
  //       onChange={(e) => setUserAccount(e.target.value)}
  //       placeholder="user account"
  //     />
  //     <input
  //       onChange={(e) => setAmount(+e.target.value)}
  //       placeholder="amount"
  //     />
  //     <input
  //       onChange={(e) => setTransactionIndex(+e.target.value)}
  //       placeholder="transaction index"
  //     />
  //   </div>
  // );
};

export default Homepage;
