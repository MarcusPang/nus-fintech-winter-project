import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import styles from "../../styles/index.module.css";
import { createWalletFactoryOptions } from "../../utils/web3";
import CustomNavLink from "./CustomNavLink";
import WalletSidebar from "./SidebarWallet";

const Layout = ({ children }) => {
  const { isAuthenticated, isWeb3Enabled, isInitialized, enableWeb3 } =
    useMoralis();
  const { fetch: getWallet } = useWeb3ExecuteFunction();
  const [walletIndex, setWalletIndex] = useState(0);
  const router = useRouter();

  const printWallet = useCallback(() => {
    getWallet({
      params: createWalletFactoryOptions("wallets", {
        "": walletIndex,
      }),
      onSuccess: (results) => console.log("[Dev]: ", results),
    });
  }, []);

  useEffect(() => {
    if (isInitialized && !isWeb3Enabled && isAuthenticated) {
      enableWeb3();
    }
    if (isInitialized && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isInitialized, isWeb3Enabled]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Nav
        style={{
          height: "100%",
          boxShadow: "5px 5px 5px lightgrey",
          background: "#f7f5f5",
          position: "fixed",
          top: 0,
          left: 0,
          width: "15%",
          display: "flex",
          flexDirection: "column",
          paddingTop: 30,
          zIndex: 1,
        }}
      >
        <Nav.Item className={styles.sideBarTab}>
          <CustomNavLink href="/">Home</CustomNavLink>
        </Nav.Item>
        <WalletSidebar />
        <Nav.Item className={styles.sideBarTab}>
          <CustomNavLink href="/wallet/new">Create New Wallet</CustomNavLink>
        </Nav.Item>
      </Nav>
      <Container
        className={styles.content}
        style={{
          paddingLeft: "12%",
        }}
      >
        {children}
        <div className={styles.testing}>
          <p>For dev testing only:</p>
          <input
            onChange={(e) => setWalletIndex(+e.target.value)}
            placeholder="Wallet index"
          />
          <button onClick={printWallet}>Print wallets</button>
        </div>
      </Container>
    </div>
  );
};

export default Layout;
