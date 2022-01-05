import { useMoralis, useMoralisQuery } from "react-moralis";
import Wallet from "./Wallet";

const MyWalletsComponent = () => {
  const { user } = useMoralis();
  const { data, error, isFetching } = useMoralisQuery("Wallet", (query) =>
    query.equalTo("walletCreator", user.get("accounts")[0])
  ); // get wallets

  return (
    <div>
      <h2>My Personal Wallet: {user.get("ethAddress")} </h2>
      <h2>My Wallets</h2>
      {data.map((wallet, key) => (
        <Wallet key={key} wallet={wallet} />
      ))}
    </div>
  );
};

export default MyWalletsComponent;
