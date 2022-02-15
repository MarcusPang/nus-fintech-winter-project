import { MouseEventHandler, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import {
  useMoralis, useWeb3ExecuteFunction
} from "react-moralis";
import { createWalletFactoryOptions } from "../../utils/web3";

const NewWalletForm = () => {
  const [userAccount, setUserAccount] = useState("");
  const [percentage, setPercentage] = useState(0);
  const { user } = useMoralis();
  const { isLoading, fetch } = useWeb3ExecuteFunction();
  // const { save } = useNewMoralisObject("MultiSigWallet");

  // pass current user's address and list of owners specified
  const createWallet: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    const userAddress = user.get("ethAddress");
    const owners = Array.from(
      new Set(
        userAccount
          .split(",")
          .concat(userAddress)
          .map((item) => item.toLowerCase())
      )
    );
    await fetch({
      params: createWalletFactoryOptions("createWallet", {
        _owners: owners,
        _percentConfirmationsRequired: percentage,
      }),
    });
    // TODO save on Moralis?
  };

  // TODO add checks for user input and error handling
  return (
    <Card
      className="m-3 p-3 b-2"
      style={{
        borderRadius: 10,
        boxShadow: "5px 5px 5px lightgrey",
        background: "#f7f7f7",
      }}
    >
      <h2>Create New Multi Signature Wallet</h2>
      <Form>
        <Form.Group controlId="userAccount">
          <Form.Label>User accounts (separate with commas):</Form.Label>
          <Form.Control
            onChange={(e) => setUserAccount(e.target.value)}
            placeholder="User account"
          />
        </Form.Group>
        <Form.Group controlId="percentage">
          <Form.Label>Percentage:</Form.Label>
          <Form.Control
            onChange={(e) => setPercentage(+e.target.value)}
            placeholder="Percentage required"
          />
        </Form.Group>
        <Button
          type="submit"
          className="btn btn-secondary mt-3"
          onClick={createWallet}
          disabled={isLoading}
        >
          Create Wallet
        </Button>
      </Form>
    </Card>
  );
};

export default NewWalletForm;
