import { Card } from "react-bootstrap";
import WalletAddTransactionModal from "./WalletAddTransactionModal";
import WalletTransactionTable from "./WalletTransactionTable";
import WalletAddOwnerModal from "./WalletAddOwnerModal";
import WalletDetails from "./WalletDetails";
import WalletOwners from "./WalletOwners";
import WalletPercentage from "./WalletPercentage";

interface WalletProps {
  wallet: string;
}

const Wallet = ({ wallet }: WalletProps) => {
  return (
    <Card
      className="m-3 p-3 b-2"
      style={{
        borderRadius: 10,
        boxShadow: "5px 5px 5px lightgrey",
      }}
    >
      <WalletDetails wallet={wallet} />
      <WalletOwners wallet={wallet} />
      <WalletAddOwnerModal wallet={wallet} />
      <WalletPercentage wallet={wallet} />
      <WalletTransactionTable wallet={wallet} />
      <WalletAddTransactionModal wallet={wallet} />
    </Card>
  );
};

export default Wallet;
