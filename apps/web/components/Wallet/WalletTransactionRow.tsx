import { ethers } from "ethers";
import { Button, CloseButton, Col, Row } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useWeb3ExecuteFunction } from "react-moralis";
import { createWalletFactoryOptions } from "../../utils/web3";

export interface TransactionData {
  from: string;
  to: string;
  value: ethers.BigNumberish;
  memory: string;
  executed: boolean;
  numConfirmations: string;
}

interface WalletTransactionRowProps {
  transaction: TransactionData & { id: number };
  wallet: string;
}

/**
 * confirm result
 * {
    "blockHash": "0xcfdeae2ecfac90203de0511be649906f06c45c7c1d2bf1e05cda186aaa6ae61d",
    "blockNumber": 11882932,
    "contractAddress": null,
    "cumulativeGasUsed": 793039,
    "effectiveGasPrice": "0x15bbab07d",
    "from": "0xd3a671b0d3efc11d3deeed8d9602a933b4f8281a",
    "gasUsed": 79553,
    "logsBloom": "0x00000000000000000000001000000000000000200000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000840000000000000000000000000000000000000000000000000000000000400000000000000010000080000000000000080000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000800000000000000000000000000000000000000000000000000000000000",
    "status": true,
    "to": "0xde92f7c3de90c379d4bb3a04d29d464b615fb4a8",
    "transactionHash": "0x61e3bb7c8fc005f2b10d4ca2bd237df0476e1dfb7a9f55a936e419c47b84169f",
    "transactionIndex": 19,
    "type": "0x2",
    "events": {
        "0": {
            "address": "0x90622a828287b43B42B610aaC9A0A25cf75F7dC0",
            "blockHash": "0xcfdeae2ecfac90203de0511be649906f06c45c7c1d2bf1e05cda186aaa6ae61d",
            "blockNumber": 11882932,
            "logIndex": 17,
            "removed": false,
            "transactionHash": "0x61e3bb7c8fc005f2b10d4ca2bd237df0476e1dfb7a9f55a936e419c47b84169f",
            "transactionIndex": 19,
            "id": "log_78903dfc",
            "returnValues": {},
            "signature": null,
            "raw": {
                "data": "0x",
                "topics": [
                    "0x5cbe105e36805f7820e291f799d5794ff948af2a5f664e580382defb63390041",
                    "0x000000000000000000000000d3a671b0d3efc11d3deeed8d9602a933b4f8281a",
                    "0x0000000000000000000000000000000000000000000000000000000000000000"
                ]
            }
        }
    }
} */

const WalletTransactionRow = ({ transaction, wallet }: WalletTransactionRowProps) => {
  const { fetch, isLoading } = useWeb3ExecuteFunction();

  const onConfirm = () => {
    fetch({
      params: createWalletFactoryOptions("confirmTransaction", {
        wallet,
        _txIndex: transaction.id,
      }),
      onSuccess: (res) => console.log(res),
    });
  };

  const onExecute = () => {
    fetch({
      params: createWalletFactoryOptions("executeTransaction", {
        wallet,
        _txIndex: transaction.id,
      }),
      onSuccess: (res) => console.log(res),
    });
  };

  return (
    <tr>
      <td className="text-center align-middle">
        {transaction.from.substring(0, 20) + "..."}
      </td>
      <td className="text-center align-middle">
        {transaction.to.substring(0, 20) + "..."}
      </td>
      <td className="text-center align-middle">
        {ethers.utils.formatEther(transaction.value)}
      </td>
      <td className="text-center align-middle">
        {transaction.executed ? <FaCheck /> : <IoClose />}
      </td>
      <td className="text-center align-middle">
        {transaction.numConfirmations}
      </td>
      <td className="text-center align-middle">
        <Button className="btn-secondary" onClick={onConfirm}>
          <FaCheck />
        </Button>
      </td>
      <td className="text-center align-middle">
        <Button className="btn-secondary" onClick={onExecute}>
          Execute
        </Button>
      </td>
    </tr>
  );
};

export default WalletTransactionRow;
