import Wallet from "./Wallet";
import { useEffect } from "react";
import {
  useMoralis,
  useMoralisQuery,
  useWeb3ExecuteFunction,
} from "react-moralis";
import { createWalletFactoryOptions } from "../utils/web3";

const MyWalletsComponent = () => {
  const { user } = useMoralis();
  // const {
  //   data: walletData,
  //   error: walletError,
  //   isFetching: walletIsFetching,
  //   fetch: walletFetch,
  // } = useMoralisQuery("MultiSigWallet", (query) =>
  //   query.equalTo("walletCreator", user.get("ethAddress"))
  // );
  const { isLoading, error, fetch, data } = useWeb3ExecuteFunction();

  const fetchWallets = async () => {
    console.log("test", user.get("ethAddress"));
    await fetch({
      params: createWalletFactoryOptions("wallets", {
        "": user.get("ethAddress"),
      }),
      onError: (e) => console.error(e),
    });
  };

  useEffect(() => {
    fetchWallets();
    console.log(data);
    // if (walletError) console.error(walletError);
  }, []);

  return (
    <div>
      <h2>My Personal Wallet: {user.get("ethAddress")} </h2>
      <h2>My Multi Signature Wallets</h2>
      {/* {!walletIsFetching &&
        walletData.map((wallet, key) => <Wallet key={key} wallet={wallet} />)} */}
    </div>
  );
};

export default MyWalletsComponent;
