import { useState, useEffect } from "react";
import { useMoralis, useMoralisQuery, useWeb3ExecuteFunction } from "react-moralis";
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

// function onDeleteOwner() {}

function onApproveTransaction() {}

const Wallet = ({ wallet }: { wallet: any }) => {

  const [owners, setOwners] = useState([]);
  const [percentageConfirmation, setPercentageConfirmation] = useState(0);
  
  const { data, error, fetch, isFetching, isLoading } =
    useWeb3ExecuteFunction();
  // const fetchOwners = async () => {
  //   await fetch({
  //     params: createWalletOptions(
  //       wallet.attributes.walletAddress,
  //       "getOwners",
  //       {}
  //     ),
  //   });
  //   setOwners(data as any);
  //   console.log(data);
  //   console.log("error", error);
  // };

  // const {
  //   data: ownersData,
  //   error: ownersError,
  //   isFetching: ownersIsFetching,
  //   fetch: ownersFetch
  // } = useMoralisQuery("MultiSigWallet", (query) =>
  //   query.equalTo("Wallet")
  // )

  //Not Auto Refreshing
  const onDeleteOwner = (toRemoveOwner) => {
    console.log(toRemoveOwner) //Not Passing In Properly
    const newOwners = owners.filter(owner => owner != '0xC') // Replace with toRemoveOwner
    wallet.set("walletOwners", newOwners)
    wallet.save()
  }

  useEffect(() => {
    setOwners(wallet.get("walletOwners"))
    setPercentageConfirmation(wallet.get("percentageConfirmation"))
  }, [])

  return (
    <div className={styles.wallet}>
      <h3>
        <b>Wallet Address: </b>
        {wallet.attributes.walletAddress}
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
            clickHandler={onDeleteOwner}
          />
        ))}
      <OwnerModalForm wallet = {wallet} owners = {owners}/>
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