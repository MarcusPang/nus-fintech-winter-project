import { NextPage } from "next";
import Layout from "../../components/Layout/Layout";
import NewWalletForm from "../../components/Wallet/AddWalletForm";

const NewWallet: NextPage = () => {
  return (
    <Layout>
      <NewWalletForm />
    </Layout>
  );
};

export default NewWallet;
