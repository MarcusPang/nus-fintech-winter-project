import { useEffect } from "react";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { createWalletOptions } from "../utils/web3";
import Wallet from "./Wallet";

const MyWalletsComponent = () => {
  const { user } = useMoralis();
  const {
    data: walletData,
    error: walletError,
    isFetching: walletIsFetching,
    fetch: walletFetch,
  } = useMoralisQuery("Wallet", (query) =>
    query.equalTo("walletCreator", user.get("accounts")[0])
  ); // get wallets

  useEffect(() => {
    walletFetch();
    console.error(walletError);
  }, [walletFetch]);

  console.log(walletData);

  return (
    <div>
      <h2>My Wallets</h2>
      {walletData.map((wallet, key) => (
        <Wallet key={key} wallet={wallet} />
      ))}
    </div>
  );
};

export default MyWalletsComponent;
