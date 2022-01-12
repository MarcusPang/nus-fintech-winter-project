import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useMoralis } from "react-moralis";
import { Web3Provider } from "react-moralis/lib/hooks/core/useMoralis/_useMoralisWeb3";
import { toast } from "react-toastify";

const connectors: {
  title: string;
  connectorId?: Web3Provider;
  priority: number;
}[] = [
  {
    title: "Metamask",
    priority: 1,
  },
  {
    title: "WalletConnect",
    connectorId: "walletconnect",
    priority: 2,
  },
  {
    title: "Trust Wallet",
    priority: 3,
  },
];

const Login: NextPage = () => {
  const { authenticate } = useMoralis();
  const router = useRouter();
  const loginHandler = async (connectorId: Web3Provider) => {
    try {
      await authenticate({ provider: connectorId });
      window.localStorage.setItem("connectorId", connectorId);
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
        {connectors.map(({ title, connectorId }, key) => (
          <button
            className="btn btn-secondary m-5"
            key={key}
            onClick={() => loginHandler(connectorId)}
          >
            {title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Login;
