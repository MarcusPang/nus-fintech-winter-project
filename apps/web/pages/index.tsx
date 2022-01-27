import { NextPage } from "next";
import React from "react";
import UserHeader from "../components/Home/UserHeader";
import WalletExplanation from "../components/Home/WalletExplanation";
import Layout from "../components/Layout/Layout";

// so typescript doesn't give an error for window.ethereum
declare global {
  interface Window {
    ethereum: any;
  }
}

const Homepage: NextPage = () => {
  return (
    <Layout>
      <UserHeader />
      <WalletExplanation />
    </Layout>
  );
};

export default Homepage;
