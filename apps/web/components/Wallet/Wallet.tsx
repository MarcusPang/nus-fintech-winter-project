import { useEffect, useState } from "react";
import { Card, Spinner, Table } from "react-bootstrap";
import { useWeb3ExecuteFunction } from "react-moralis";
import styles from "../../styles/Wallet.module.css";
import { createWalletFactoryOptions } from "../../utils/web3";
import WalletAddOwnerModal from "./WalletAddOwnerModal";
import TransactionModalForm from "./TransactionModalForm";
import WalletOwners from "./WalletOwners";
import TransactionRow, { TransactionData } from "./TransactionRow";

interface WalletProps {
  wallet: string;
}

function onApproveTransaction() {}

const Wallet = ({ wallet }: WalletProps) => {
  const [percentageConfirmation, setPercentageConfirmation] = useState(0);
  const [transactions, setTransactions] = useState<
    (TransactionData & { id: number })[]
  >([]);

  // fetch functions
  const { fetch: transactionCountFetch } = useWeb3ExecuteFunction();
  const { fetch: transactionsFetch, isLoading: transactionsIsLoading } =
    useWeb3ExecuteFunction();
  const { fetch: percentageFetch, isLoading: percentageIsLoading } =
    useWeb3ExecuteFunction();

  useEffect(() => {
    // TODO get batch of transactions instead?
    transactionCountFetch({
      params: createWalletFactoryOptions("getTransactionCount", {
        wallet,
      }),
      onSuccess: (results: number) => {
        for (let i = 0; i < results; i++) {
          transactionsFetch({
            params: createWalletFactoryOptions("getTransaction", {
              wallet,
              _txIndex: i,
            }),
            onSuccess: (results: TransactionData) =>
              setTransactions((prev) => [...prev, { id: i, ...results }]),
          });
        }
      },
    });
    percentageFetch({
      params: createWalletFactoryOptions("getPercentConfirmationsRequired", {
        wallet,
      }),
      onSuccess: (res: number) => setPercentageConfirmation(res),
    });
    return () => {
      setTransactions([]);
    };
  }, [wallet]);

  console.log(transactions);

  return (
    <Card className={styles.wallet}>
      <h2>Wallet Creator:</h2>
      <strong>Owners:</strong>
      <WalletOwners wallet={wallet} />
      <WalletAddOwnerModal wallet={wallet} />
      <div>
        <strong>Percentage confirmation: </strong>
        {percentageIsLoading ? (
          <div className="loading"></div>
        ) : (
          percentageConfirmation
        )}
      </div>
      <strong>Active transactions: </strong>
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Value</th>
            <th>Executed</th>
            <th>No. of Confirmations</th>
            <th>Confirm?</th>
            <th>Execute?</th>
          </tr>
        </thead>
        <tbody>
          {transactionsIsLoading ? (
            <tr>
              <td colSpan={7} className="text-center align-middle">
                <Spinner animation="border" />
              </td>
            </tr>
          ) : (
            transactions.map((txn, index) => (
              <TransactionRow transaction={txn} wallet={wallet} key={index} />
            ))
          )}
        </tbody>
      </Table>
      <TransactionModalForm wallet={wallet} />
    </Card>
  );
};

export default Wallet;
