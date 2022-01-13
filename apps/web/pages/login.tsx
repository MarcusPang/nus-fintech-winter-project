import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { Web3Provider } from "react-moralis/lib/hooks/core/useMoralis/_useMoralisWeb3";
import { toast } from "react-toastify";

const connectors: {
  title: string;
  connectorId: string;
  priority: number;
}[] = [
  {
    title: "Metamask",
    connectorId: "injected",
    priority: 1,
  },
  {
    title: "WalletConnect",
    connectorId: "walletconnect",
    priority: 2,
  },
  {
    title: "Trust Wallet",
    connectorId: "injected",
    priority: 3,
  },
];

const Login: NextPage = () => {
  const {
    authenticate,
    isAuthenticated,
    isWeb3Enabled,
    isInitialized,
    enableWeb3,
  } = useMoralis();
  const router = useRouter();
  const loginHandler = async (connectorId?: string) => {
    try {
      if (connectorId) {
        await authenticate({ provider: connectorId as Web3Provider });
        window.localStorage.setItem("connectorId", connectorId);
      } else {
        await authenticate();
      }
      router.push("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center flex-column">
      <div className="display-4 m-5">Multi-Signature Wallet</div>
      <Image
        className="img-thumbnail"
        src="/home_image.jpeg"
        width="800"
        height="500"
        alt="image thumbnail"
        layout="fixed"
      />
      <div className="d-flex align-items-center justify-content-center">
        <button
          className="btn btn-secondary m-5"
          onClick={() => loginHandler()}
        >
          Metamask
        </button>
        <button
          className="btn btn-secondary m-5"
          onClick={() => loginHandler("walletconnect")}
        >
          WalletConnect
        </button>
      </div>
    </div>
  );
};

export default Login;
