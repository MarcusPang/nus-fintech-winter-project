import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Row,
  Stack,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { useMoralis } from "react-moralis";
import { Web3Provider } from "react-moralis/lib/hooks/core/useMoralis/_useMoralisWeb3";

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
  const { authenticate } = useMoralis();
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);
  const loginHandler = async (connectorId?: string) => {
    if (!window.ethereum) {
      setShowToast(true);
      return;
    }
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
    <Container>
      <Stack className="mx-auto">
        <h1 className="display-4 m-5 text-center">Multi-Signature Wallet</h1>
        <div className="mx-auto">
          <Image
            className="img-thumbnail mx-auto"
            src="/home_image.jpeg"
            width="800"
            height={"500"}
            layout="fixed"
            alt="image thumbnail"
          />
        </div>
        <div className="mx-auto">
          <Button className="btn-secondary m-5" onClick={() => loginHandler()}>
            Metamask
          </Button>
          <Button
            className="btn-secondary m-5"
            onClick={() => loginHandler("walletconnect")}
          >
            WalletConnect
          </Button>
        </div>

        <ToastContainer className="p-3" position={"top-start"}>
          <Toast show={showToast} onClose={() => setShowToast(false)}>
            <Toast.Header>
              <strong className="me-auto">Web3 wallet not found!</strong>
            </Toast.Header>
            <Toast.Body>Please enable MetaMask or WalletConnect.</Toast.Body>
          </Toast>
        </ToastContainer>
      </Stack>
    </Container>
  );
};

export default Login;
