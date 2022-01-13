import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import styles from "../../styles/index.module.css";
import { createWalletFactoryOptions } from "../../utils/web3";
import WalletSidebar from "./SidebarWallet";

const Layout = ({ children }) => {
  const { user } = useMoralis();
  const { fetch } = useWeb3ExecuteFunction();
  const {
    data: wallets,
    fetch: walletFetch,
    isLoading: walletIsLoading,
  } = useWeb3ExecuteFunction();
  const { data: walletOwners, fetch: walletOwnerFetch } =
    useWeb3ExecuteFunction();
  const [walletIndex, setWalletIndex] = useState(0);
  const [userWallets, setUserWallets] = useState<string[]>([]);
  const router = useRouter();

  const printWallet = useCallback(async () => {
    await fetch({
      params: createWalletFactoryOptions("wallets", {
        "": walletIndex,
      }),
      onSuccess: (results) => console.log("[Dev]: ", results),
    });
  }, []);

  // get wallets and walletOwners array from chain
  useEffect(() => {
    walletFetch({
      params: createWalletFactoryOptions("getWallets", {}),
    });
    walletOwnerFetch({
      params: createWalletFactoryOptions("getWalletCreators", {}),
    });
  }, []);

  // filter the wallets array using current user's address
  useEffect(() => {
    if (user && wallets && walletOwners) {
      const userAddress = user.get("ethAddress").toLowerCase();

      const currentWallets = new Set(userWallets);
      (wallets as string[]).forEach((wallet, index) => {
        if (walletOwners[index].toLowerCase() === userAddress) {
          currentWallets.add(wallet);
        }
      });
      setUserWallets(Array.from(currentWallets));
    }
  }, [wallets, walletOwners, user]);

  return (
    <div className={styles.sideBarAndContent}>
      <div className={styles.sideBar}>
        <button className={styles.sideBarTab} onClick={() => router.push("/")}>
          Home
        </button>
        <WalletSidebar wallets={userWallets} isLoading={walletIsLoading} />
        <button
          className={styles.sideBarTab}
          onClick={() => router.push("/wallet/new")}
        >
          Create New Wallet
        </button>
      </div>
      <div className={styles.content}>
        {children}
        <div className={styles.testing}>
          <p>For dev testing only:</p>
          <input
            onChange={(e) => setWalletIndex(+e.target.value)}
            placeholder="Wallet index"
          />
          <button onClick={printWallet}>Print wallets</button>
        </div>
      </div>
    </div>
  );
};

export default Layout;
