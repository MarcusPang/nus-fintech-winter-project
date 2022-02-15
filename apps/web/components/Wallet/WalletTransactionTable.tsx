import React, { useEffect } from "react";
import { useState } from "react";
import { Spinner, Table } from "react-bootstrap";
import { useWeb3ExecuteFunction } from "react-moralis";
import { createWalletFactoryOptions } from "../../utils/web3";
import WalletTransactionRow, { TransactionData } from "./WalletTransactionRow";

interface WalletTransactionTableProps {
  wallet: string;
}

const WalletTransactionTable = ({ wallet }: WalletTransactionTableProps) => {
  const { fetch: transactionsFetch, isLoading: transactionsIsLoading } =
    useWeb3ExecuteFunction();
  const { fetch: transactionCountFetch } = useWeb3ExecuteFunction();

  const [transactions, setTransactions] = useState<
    (TransactionData & { id: number })[]
  >([]);

  useEffect(() => {
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
    return () => {
      setTransactions([]);
    };
  }, [transactionCountFetch, transactionsFetch, wallet]);

  return (
    <div>
      <strong>Active transactions: </strong>
      {transactions.filter((transaction) => !transaction.executed).length}
      <Table striped bordered responsive className="mt-2">
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
              <WalletTransactionRow transaction={txn} wallet={wallet} key={index} />
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default WalletTransactionTable;
