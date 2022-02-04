import { useRouter } from "next/router";
import { MouseEventHandler, useEffect, useState } from "react";
import { Button, Card, Form, Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import styles from "../../styles/index.module.css";
import { createWalletFactoryOptions } from "../../utils/web3";
import CustomNavLink from "./CustomNavLink";
import WalletSidebar from "./WalletSidebar";

const Layout = ({ children }) => {
  const { isAuthenticated, isWeb3Enabled, isInitialized, enableWeb3, logout } =
    useMoralis();
  const { fetch: getWallet } = useWeb3ExecuteFunction();
  const [walletIndex, setWalletIndex] = useState(0);
  const router = useRouter();

  const printWallet: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    getWallet({
      params: createWalletFactoryOptions("getWallets", {}),
      onSuccess: (results) => {
        if (walletIndex >= 0) {
          console.log("[Dev]: ", results[walletIndex]);
        } else {
          console.log("[Dev]: ", results);
        }
      },
    });
  };

  useEffect(() => {
    if (isInitialized && !isWeb3Enabled && isAuthenticated) {
      enableWeb3();
    }
    if (isInitialized && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isInitialized, isWeb3Enabled]);

  return (
    <Stack>
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
          paddingTop: 20,
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

        <Button
          className="btn-secondary w-75 mx-auto mt-3"
          onClick={async () => {
            await logout();
            window.localStorage.removeItem("connectorId");
          }}
        >
          Logout
        </Button>
      </Nav>
      <Container
        className={styles.content}
        style={{
          paddingLeft: "12%",
        }}
      >
        {children}
        <Card>
          <Card.Header>For dev testing only:</Card.Header>
          <Card.Body>
            <Form>
              <Form.Group>
                <Form.Label>Wallet Index</Form.Label>
                <Stack direction="horizontal" style={{ alignItems: "center" }}>
                  <Form.Control
                    onChange={(e) => setWalletIndex(+e.target.value)}
                    placeholder="Wallet index"
                    style={{
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                    }}
                  />
                  <Button
                    type="submit"
                    onClick={printWallet}
                    style={{
                      width: "20%",
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    }}
                  >
                    Print wallets
                  </Button>
                </Stack>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </Stack>
  );
};

export default Layout;
