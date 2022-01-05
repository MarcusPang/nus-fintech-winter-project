import Wallet from './Wallet';
import { useMoralis } from "react-moralis";

const MyWalletsComponent = () => {

  const { user, logout } = useMoralis();

  return (
    <div>
      <h2>My Personal Wallet: {user.get("ethAddress")} </h2>
      <h2>My Multi-Signature Wallets</h2>
      <Wallet />
    </div>
  );
};

export default MyWalletsComponent;
