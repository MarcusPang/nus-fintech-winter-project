import { useRouter } from "next/router";
import { useEffect } from "react";
import { Stack } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { useMoralis } from "react-moralis";
import styles from "../../styles/index.module.css";
import DevTesting from "./DevTesting";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const { isAuthenticated, isWeb3Enabled, isInitialized, enableWeb3 } =
    useMoralis();
  const router = useRouter();

  useEffect(() => {
    if (isInitialized && !isWeb3Enabled && isAuthenticated) {
      enableWeb3();
    }
    if (isInitialized && !isAuthenticated) {
      router.push("/login");
    }
  }, [enableWeb3, isAuthenticated, isInitialized, isWeb3Enabled, router]);

  return (
    <Stack>
      <Sidebar />
      <Container
        className={styles.content}
        style={{
          paddingLeft: "12%",
        }}
      >
        {children}
        <DevTesting />
      </Container>
    </Stack>
  );
};

export default Layout;
