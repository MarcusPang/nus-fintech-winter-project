import React, { useEffect, useState } from "react";
import { Spinner, Stack } from "react-bootstrap";
import { useMoralis, useNativeBalance } from "react-moralis";
import WalletAddAmountModal from "./WalletAddAmountModal";

interface WalletDetailsProps {
  wallet: string;
}

const WalletDetails = ({ wallet }: WalletDetailsProps) => {
  const { Moralis } = useMoralis();
  const { getBalances, isLoading } = useNativeBalance();

  const [amount, setAmount] = useState("0");

  useEffect(() => {
    getBalances({
      params: {
        chain: "ropsten",
        address: wallet,
      },
      onSuccess: (res) => setAmount(Moralis.Units.FromWei(res.balance)),
    });
    return () => {
      setAmount("0");
    };
  }, [Moralis.Units, getBalances, wallet]);

  return (
    <>
      <h3>Wallet Creator:</h3>
      <Stack direction="horizontal">
        <h3 className="mb-0 me-3">
          {"Amount: "}
          {isLoading ? <Spinner animation="border" /> : amount + " ETH"}
        </h3>
        <WalletAddAmountModal wallet={wallet} />
      </Stack>
    </>
  );
};

export default WalletDetails;
