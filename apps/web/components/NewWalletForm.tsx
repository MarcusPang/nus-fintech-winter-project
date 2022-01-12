import { useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import styles from "../styles/NewWalletForm.module.css";
import { createWalletFactoryOptions } from "../utils/web3";
// import { createWalletFactoryOptions } from "../utils/web3";

// so typescript doesn't give an error for window.ethereum
declare global {
  interface Window {
    ethereum: any;
  }
}

const NewWalletForm = () => {
  const [userAccount, setUserAccount] = useState("");
  const [percentage, setPercentage] = useState(0);
  const { user } = useMoralis();
  const { isLoading, error, fetch } = useWeb3ExecuteFunction();

  // pass current user's address and list of owners specified
  const createWallet = async () => {
    await fetch({
      params: createWalletFactoryOptions("createWallet", {
        _owners: Array.from(
          new Set(
            userAccount
              .split(",")
              .concat(user.get("ethAddress"))
              .map((item) => item.toLowerCase())
          )
        ),
        _percentConfirmationsRequired: percentage,
      }),
      onError: (error) => console.error(error),
      onSuccess: (results) => console.log("[Create wallet]: ", results),
    });
  };

  // TODO add checks for user input and error handling
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
            onClick={createWallet}
            disabled={isLoading}
          >
            Create Wallet
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewWalletForm;
