import { useState } from "react";
import { useNewMoralisObject, useWeb3ExecuteFunction } from "react-moralis";
import styles from "../styles/NewWalletForm.module.css";
import { createWalletFactoryOptions } from "../utils/web3";

// so typescript doesn't give an error for window.ethereum
declare global {
  interface Window {
    ethereum: any;
  }
}

const NewWalletForm = () => {
  const [userAccount, setUserAccount] = useState("");
  const [percentage, setPercentage] = useState(0);

  const { data, error, fetch, isFetching, isLoading } =
    useWeb3ExecuteFunction();
  const { isSaving, error: walletError, save } = useNewMoralisObject("Wallet");

  const createWallet = async () => {
    if (!isLoading)
      await fetch({
        params: createWalletFactoryOptions("createWallet", {
          _owners: userAccount.split(","),
          _percentConfirmationsRequired: percentage,
        }),
      });
    if (!error && !isFetching)
      await save({ walletCreator: userAccount, walletAddress: userAccount });
  };

  // console.log("[wallet data]:", data);

  return (
    <div>
      <div className={styles.createNewWallet}>
        <h2>Create New Multi Signature Wallet</h2>
        <div className={styles.formElems}>
          <label>User accounts (separate with commas):</label>
          <input
            onChange={(e) => setUserAccount(e.target.value)}
            placeholder="User account"
          />
        </div>
        <div className={styles.formElems}>
          <label>Percentage:</label>
          <input
            onChange={(e) => setPercentage(+e.target.value)}
            placeholder="Percentage required"
          />
        </div>
        <div className={styles.formElems}>
          <button
            className="btn btn-secondary"
            onClick={() => createWallet()}
            disabled={isFetching}
          >
            Create Wallet
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewWalletForm;
