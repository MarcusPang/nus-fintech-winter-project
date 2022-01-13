import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";
import Layout from "../components/Layout/Layout";
import UserHeader from "../components/Home/UserHeader";
import WalletExplanation from "../components/Home/WalletExplanation";
import styles from "../styles/index.module.css";

// so typescript doesn't give an error for window.ethereum
declare global {
  interface Window {
    ethereum: any;
  }
}

const Homepage: NextPage = () => {
  const { isAuthenticated, user, isWeb3Enabled, isInitialized, enableWeb3 } =
    useMoralis();
  const router = useRouter();

  useEffect(() => {
    if (isInitialized && !isWeb3Enabled && isAuthenticated) {
      enableWeb3();
    }
    if (isInitialized && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isInitialized, isWeb3Enabled]);

  if (!isInitialized || !isWeb3Enabled) {
    return <div className="loading" />;
  }

  return (
    <div>
      <div className={styles.background}>
        <div className={styles.header}></div>
        <div className={styles.sideBarAndContent}>
          {user && (
            <Layout>
              <UserHeader />
              <WalletExplanation />
            </Layout>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
