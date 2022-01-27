import { NextPage } from "next";
import Layout from "../../components/Layout/Layout";
import WalletAddForm from "../../components/Wallet/WalletAddForm";

const NewWallet: NextPage = () => {
  return (
    <Layout>
      <WalletAddForm />
    </Layout>
  );
};

export default NewWallet;
