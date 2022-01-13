import { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../../../components/Layout/Layout";
import Wallet from "../../../components/Wallet/Wallet";

const WalletPage: NextPage = () => {
  const router = useRouter();
  const { wallet } = router.query as { wallet: string };
  return (
    <Layout>
      <Wallet wallet={wallet} />
    </Layout>
  );
};

export default WalletPage;
