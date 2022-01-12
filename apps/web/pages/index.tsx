import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";
import Content from "../components/Content";
import styles from "../styles/index.module.css";

// so typescript doesn't give an error for window.ethereum
declare global {
  interface Window {
    ethereum: any;
  }
}

const Homepage: NextPage = () => {
  const { isAuthenticated, user } = useMoralis();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  return (
    <div>
      <div className={styles.background}>
        <div className={styles.header}></div>
        <div className={styles.sideBarAndContent}>
          {user ? <Content /> : <div className="loader"></div>}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
