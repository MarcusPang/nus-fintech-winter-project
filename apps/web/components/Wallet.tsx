import { useEffect, useState } from "react";
import { useWeb3ExecuteFunction } from "react-moralis";
import styles from "../styles/Wallet.module.css";
import { createWalletFactoryOptions } from "../utils/web3";
import DataRow from "./DataRow";
import OwnerModalForm from "./OwnerModalForm";
import TransactionModalForm from "./TransactionModalForm";

const transactions = [
  "Request to send 2 ETH from 0xTIM to 0xJACK",
  "Request to send 1 ETH from 0xSAM to 0xJACK",
  "Request to send 500 ETH from 0xSAM to 0xLILY",
];

function onApproveTransaction() {}

const Wallet = ({ wallet }: { wallet: string }) => {
  const [owners, setOwners] = useState<string[]>([]);
  const [percentageConfirmation, setPercentageConfirmation] = useState(0);
  const { fetch: ownerFetch } = useWeb3ExecuteFunction();
  const { fetch: removeOwnerFetch } = useWeb3ExecuteFunction();

  const fetchOwners = async () => {
    await ownerFetch({
      params: createWalletFactoryOptions("getOwners", {
        wallet,
      }),
      onError: (e) => console.error(e),
      onSuccess: (results) => {
        console.log("[Owners]: ", results);
        setOwners(results as string[]);
      },
    });
  };

  const deleteOwner = async (owner: string) => {
    await removeOwnerFetch({
      params: createWalletFactoryOptions("removeOwner", {
        wallet,
        existingOwner: owner,
      }),
      onError: (e) => console.error(e),
      onSuccess: (results) => {
        console.log("Successfully deleted ", owner);
        console.log("[results]: ", results);
      },
    });
  };

  useEffect(() => {
    fetchOwners();
    // setOwners(wallet.get("walletOwners"));
    // console.log("getOwners", wallet.get("walletOwners"));
    // setPercentageConfirmation(wallet.get("percentageConfirmation"));
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
