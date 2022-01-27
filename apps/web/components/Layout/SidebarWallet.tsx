import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import styles from "../../styles/index.module.css";
import { createWalletFactoryOptions } from "../../utils/web3";
import CustomNavLink from "./CustomNavLink";

interface WalletSidebarInterface {}

const WalletSidebar = ({}: WalletSidebarInterface) => {
  const router = useRouter();

  const { user, isAuthenticated, isInitialized, isWeb3Enabled } = useMoralis();
  const { fetch: walletFetch, isLoading } = useWeb3ExecuteFunction();
  const { fetch: walletOwnerFetch } = useWeb3ExecuteFunction();
  const [wallets, setWallets] = useState<string[]>([]);

  useEffect(() => {
    // get user's wallets
    walletFetch({
      params: createWalletFactoryOptions("getWallets", {}),
      onSuccess: (wallets: string[]) => {
        if (wallets && wallets.length) {
          // if there are wallets then search for creators to filter by user
          walletOwnerFetch({
            params: createWalletFactoryOptions("getWalletCreators", {}),
            onSuccess: (owners: string[]) => {
              // owners and wallets arrays will have matching indices
              const userAddress = user.get("ethAddress").toLowerCase();

              const currentWallets = new Set<string>();
              wallets.forEach((wallet, index) => {
                if (owners[index].toLowerCase() === userAddress) {
                  currentWallets.add(wallet);
                }
              });
              setWallets(Array.from(currentWallets));
            },
          });
        }
      },
    });
  }, [isAuthenticated, isInitialized, isWeb3Enabled]);

  if (!isLoading && wallets) {
    return (
      <>
        {wallets.map((wallet, key) => (
          <Nav.Item className={styles.sideBarTab} key={key}>
            <CustomNavLink href={"/wallet/" + wallet}>
              {wallet.substring(0, 15) + "..."}
            </CustomNavLink>
          </Nav.Item>
        ))}
      </>
    );
  }
  return <div className="loading"></div>;
};

export default WalletSidebar;
