import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useWeb3ExecuteFunction } from "react-moralis";
import Layout from "../../../components/Layout/Layout";
import Wallet from "../../../components/Wallet/Wallet";
import { createWalletFactoryOptions } from "../../../utils/web3";

const WalletPage: NextPage = () => {
  const [owners, setOwners] = useState<string[]>([]);
  const { fetch: ownerFetch } = useWeb3ExecuteFunction();
  const fetchOwners = useCallback(async () => {
    await ownerFetch({
      params: createWalletFactoryOptions("getOwners", {
        wallet,
      }),
      onError: (e) => console.error("failed to fetch owners ", e),
      onSuccess: (results) => {
        console.log("[owners]: ", results);
        setOwners(results as string[]);
      },
    });
  }, []);

  useEffect(() => {
    fetchOwners();
  }, []);

  const router = useRouter();
  const { wallet } = router.query as { wallet: string };
  return (
    <Layout>
      <Wallet wallet={wallet} owners={owners} />
    </Layout>
  );
};

export default WalletPage;
