import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useWeb3ExecuteFunction } from "react-moralis";
import { createWalletFactoryOptions } from "../../utils/web3";

interface WalletPercentageProps {
  wallet: string;
}

const WalletPercentage = ({ wallet }: WalletPercentageProps) => {
  const [percentageConfirmation, setPercentageConfirmation] = useState(0);

  // fetch functions
  const { fetch: percentageFetch, isLoading: percentageIsLoading } =
    useWeb3ExecuteFunction();

  useEffect(() => {
    percentageFetch({
      params: createWalletFactoryOptions("getPercentConfirmationRequired", {
        wallet,
      }),
      onSuccess: (res: number) => setPercentageConfirmation(res),
    });
    return () => {
      setPercentageConfirmation(0);
    };
  }, [percentageFetch, wallet]);

  return (
    <div>
      <strong>Percentage confirmation: </strong>
      {percentageIsLoading ? (
        <Spinner animation="border" />
      ) : (
        percentageConfirmation + "%"
      )}
    </div>
  );
};

export default WalletPercentage;
