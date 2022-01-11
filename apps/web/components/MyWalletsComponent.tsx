import Wallet from './Wallet';
import { useEffect } from "react";
import { useMoralis, useMoralisQuery } from "react-moralis";
// import { createWalletOptions } from "../utils/web3";

const MyWalletsComponent = () => {
  const { user } = useMoralis();
  const {
    data: walletData,
    error: walletError,
    isFetching: walletIsFetching,
    fetch: walletFetch,
  } = useMoralisQuery("MultiSigWallet", (query) =>
    query.equalTo("walletCreator", user.get("ethAddress")) //this should be checking whether user is inside walletOwners instead of walletCreator right
  ); 

  useEffect(() => {
    walletFetch();
    console.error(walletError);
  }, [walletFetch]);

  console.log('walletData in mywallets', walletData);

  return (
    <div>
      <h2>My Personal Wallet: {user.get("ethAddress")} </h2>
      <h2>My Multi Signature Wallets</h2>
      {walletData.map((wallet, key) => (
        <Wallet key={key} wallet={wallet} />
      ))}
    </div>
  );
};

export default MyWalletsComponent;