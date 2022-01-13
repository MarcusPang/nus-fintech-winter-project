import { useCallback, useEffect, useState } from "react";
import { useWeb3ExecuteFunction } from "react-moralis";
import styles from "../../styles/Wallet.module.css";
import { createWalletFactoryOptions } from "../../utils/web3";
import DataRow from "../Layout/DataRow";
import OwnerModalForm from "./AddOwnerModal";
import TransactionModalForm from "./TransactionModalForm";

interface WalletProps {
  wallet: string;
  owners: string[];
}

function onApproveTransaction() {}

const Wallet = ({ wallet, owners }: WalletProps) => {
  const [percentageConfirmation, setPercentageConfirmation] = useState(0);
  const [transactionCount, setTransactionCount] = useState(0);
  const [transactions, setTransactions] = useState([]);

  // fetch functions
  const { fetch: removeOwnerFetch } = useWeb3ExecuteFunction();
  const { fetch: transactionCountFetch } = useWeb3ExecuteFunction();
  const { fetch: transactionsFetch } = useWeb3ExecuteFunction();

  const deleteOwner = useCallback(async (owner: string) => {
    await removeOwnerFetch({
      params: createWalletFactoryOptions("removeOwner", {
        wallet,
        existingOwner: owner,
      }),
      onError: (e) => console.error("failed to delete owner ", e),
      onSuccess: (results) => {
        console.log("Successfully deleted ", owner);
        console.log("[results]: ", results);
      },
    });
  }, []);

  const fetchTransactions = useCallback(async () => {
    await transactionCountFetch({
      params: createWalletFactoryOptions("getTransactionCount", {
        wallet,
      }),
      onSuccess: (results) => {
        console.log("[tx count]: ", results);
        setTransactionCount(results as number);
      },
    });
    if (transactionCount > 1) {
      const transactions = new Set();
      for (let i = 0; i < transactionCount; i++) {
        await transactionsFetch({
          params: createWalletFactoryOptions("getTransaction", {
            wallet,
            _txIndex: i,
          }),
          onSuccess: (results) => transactions.add(results),
        });
      }
      setTransactions(Array.from(transactions));
      console.log("[txs]: ", Array.from(transactions));
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className={styles.wallet}>
      <h3>
        <b>Wallet Creator: </b>
        {/* {wallet.attributes.walletCreator} */}
      </h3>
      <p>
        <b>Owners:</b>
      </p>
      {owners &&
        owners.map((owner, index) => (
          <DataRow
            text={owner}
            buttonText="Delete"
            key={index}
            clickHandler={() => deleteOwner(owner)}
          />
        ))}
      <OwnerModalForm wallet={wallet} owners={owners} />
      <p>
        <b>Percentage confirmation:</b> {percentageConfirmation}
      </p>
      <p>
        <b>Active transactions:</b>
      </p>
      {transactions.map((txn, index) => (
        <DataRow
          text={txn}
          buttonText="Approve transaction"
          key={index}
          clickHandler={onApproveTransaction}
        />
      ))}
      <TransactionModalForm />
    </div>
  );
};

export default Wallet;
