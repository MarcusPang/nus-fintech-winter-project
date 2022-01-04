import { useState } from "react";
import { useMoralis, useNativeBalance } from "react-moralis";
import { Web3Provider } from "react-moralis/lib/hooks/core/useMoralis/_useMoralisWeb3";
import {
  confirmTransaction,
  createWallet,
  getOwners,
  getTransactions,
  getWallets,
  submitTransaction,
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
  const [userAccount, setUserAccount] = useState("");
  const [percentage, setPercentage] = useState(0);
  const [transactionIndex, setTransactionIndex] = useState(0);
  const [amount, setAmount] = useState(0);
  const [walletIndex, setWalletIndex] = useState(0);
  const { authenticate, isAuthenticated, user, logout } = useMoralis();

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
      <h1>Welcome {user.get("username")}</h1>
      <button onClick={() => logout()}>Logout</button>
      <input
        onChange={(e) => setUserAccount(e.target.value)}
        placeholder="user account"
      />
      <input
        onChange={(e) => setPercentage(+e.target.value)}
        placeholder="percentage required"
      />
      <button onClick={async () => await createWallet(userAccount, percentage)}>
        Create Wallet
      </button>
      <br />
      <input
        onChange={(e) => setWalletIndex(+e.target.value)}
        placeholder="Wallet index"
      />
      <button onClick={() => getWallets(walletIndex)}>Print wallets</button>
    </div>
  );

  return (
    <div>
      <h1>Web</h1>
      <br />
      <button onClick={getOwners}>get owners</button>
      <button onClick={getTransactions}>get transactions</button>
      <button onClick={() => submitTransaction(userAccount, amount)}>
        submit transaction
      </button>
      <button onClick={() => confirmTransaction(transactionIndex)}>
        confirm transaction
      </button>
      <input
        onChange={(e) => setUserAccount(e.target.value)}
        placeholder="user account"
      />
      <input
        onChange={(e) => setAmount(+e.target.value)}
        placeholder="amount"
      />
      <input
        onChange={(e) => setTransactionIndex(+e.target.value)}
        placeholder="transaction index"
      />
    </div>
  );
};

export default Homepage;
