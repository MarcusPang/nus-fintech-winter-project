import { useState } from "react";
import { createWallet,} from "../utils/web3";
import styles from '../styles/NewWalletForm.module.css';

// so typescript doesn't give an error for window.ethereum
declare global {
  interface Window {
    ethereum: any;
  }
}

const NewWalletForm = () => {
  const [userAccount, setUserAccount] = useState("");
  const [percentage, setPercentage] = useState(0);
  const [walletIndex, setWalletIndex] = useState(0);

  return (
    <div>
      <div className={styles.createNewWallet}>
        <h2>Create New Multi Signature Wallet</h2> 
        <div className={styles.formElems}>
          <label>User accounts:</label>
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
          <button className="btn btn-secondary" onClick={async () => await createWallet(userAccount, percentage)}>
            Create Wallet
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewWalletForm;
