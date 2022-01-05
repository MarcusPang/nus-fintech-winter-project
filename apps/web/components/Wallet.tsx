import { useState } from "react";
import { useWeb3ExecuteFunction } from "react-moralis";
import styles from "../styles/Wallet.module.css";
import { createWalletOptions } from "../utils/web3";
import DataRow from "./DataRow";
import OwnerModalForm from "./OwnerModalForm";
import TransactionModalForm from "./TransactionModalForm";

// const owners = ["0xSAM", "0xTIM", "0xLINDA"];
const transactions = [
  "Request to send 2 ETH from 0xTIM to 0xJACK",
  "Request to send 1 ETH from 0xSAM to 0xJACK",
  "Request to send 500 ETH from 0xSAM to 0xLILY",
];

function onDeleteOwner() {}

function onApproveTransaction() {}

const Wallet = ({ wallet }: { wallet: any }) => {
  const [owners, setOwners] = useState([]);
  const { data, error, fetch, isFetching, isLoading } =
    useWeb3ExecuteFunction();

  const fetchOwners = async () => {
    await fetch({
      params: createWalletOptions(
        wallet.attributes.walletAddress,
        "getOwners",
        {}
      ),
    });
    setOwners(data as any);
    console.log(data);
    console.log("error", error);
  };

  return (
    <div className={styles.wallet}>
      <h3>
        <b>Wallet Address: </b>
        {wallet.attributes.walletAddress}
      </h3>
      <p>
        <b>Owners:</b>
      </p>
      <button
        className="btn btn-secondary"
        type="button"
        onClick={() => fetchOwners()}
      >
        Fetch owners
      </button>
      {owners &&
        owners.map((owner, index) => (
          <DataRow
            text={owner}
            buttonText="Delete"
            key={index}
            clickHandler={onDeleteOwner}
          />
        ))}
      <OwnerModalForm />
      <p>
        <b>Percentage confirmation:</b> 50%
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
