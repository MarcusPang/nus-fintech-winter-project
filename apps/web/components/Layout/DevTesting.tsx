import { MouseEventHandler, useState } from "react";
import { Button, Card, Form, Stack } from "react-bootstrap";
import { useWeb3ExecuteFunction } from "react-moralis";
import { createWalletFactoryOptions } from "../../utils/web3";

const DevTesting = () => {
  const [walletIndex, setWalletIndex] = useState(0);
  const { fetch: getWallet } = useWeb3ExecuteFunction();

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
  return (
    <Card className="m-3" style={{ boxShadow: "5px 5px 5px lightgrey" }}>
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
  );
};

export default DevTesting;
