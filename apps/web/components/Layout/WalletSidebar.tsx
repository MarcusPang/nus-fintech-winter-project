import { useEffect, useState } from "react";
import { Nav, Spinner } from "react-bootstrap";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import styles from "../../styles/index.module.css";
import { createWalletFactoryOptions } from "../../utils/web3";
import CustomNavLink from "./CustomNavLink";

interface WalletSidebarInterface {}

const WalletSidebar = ({}: WalletSidebarInterface) => {
  const { user, isAuthenticated, isInitialized, isWeb3Enabled } = useMoralis();
  const { fetch: walletFetch, isLoading } = useWeb3ExecuteFunction();
  const { fetch: walletOwnerFetch } = useWeb3ExecuteFunction();
  const [wallets, setWallets] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      // get user's wallets
      walletFetch({
        params: createWalletFactoryOptions("getWallets", {}),
        onSuccess: (existingWallets: string[]) => {
          // if there are wallets then check each wallet if user is owner
          // TODO cache responses/store in database
          if (existingWallets && existingWallets.length) {
            existingWallets.forEach(async (wallet) => {
              await walletOwnerFetch({
                params: createWalletFactoryOptions("isOwner", {
                  wallet,
                  _owner: user.get("ethAddress").toLowerCase(),
                }),
                onSuccess: (isOwner: boolean) => {
                  if (isOwner) {
                    setWallets((prev) => [...new Set([...prev, wallet])]);
                  }
                },
              });
            });
          }
        },
      });
    }
    return () => {
      setWallets([]);
    };
  }, [
    isAuthenticated,
    isInitialized,
    isWeb3Enabled,
    user,
    walletFetch,
    walletOwnerFetch,
  ]);

  if (!isLoading && wallets.length) {
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
  return (
    <div className="px-4 py-1">
      <Spinner animation="border" />
    </div>
  );
};

export default WalletSidebar;
