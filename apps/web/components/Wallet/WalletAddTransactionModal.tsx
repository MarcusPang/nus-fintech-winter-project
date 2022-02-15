import { ethers } from "ethers";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { createWalletFactoryOptions } from "../../utils/web3";

interface WalletAddTransactionModalProps {
  wallet: string;
}

const WalletAddTransactionModal = ({
  wallet,
}: WalletAddTransactionModalProps) => {
  const { user } = useMoralis();
  const [userAccount, setUserAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { fetch } = useWeb3ExecuteFunction();

  const submitTransaction = () => {
    fetch({
      params: createWalletFactoryOptions("submitTransaction", {
        wallet,
        _from: user.get("ethAddress"),
        _to: userAccount,
        _value: ethers.utils.parseEther(amount),
        _data: "0x00",
      }),
      // onSuccess: (res) => console.log(res),
      // onError: (err) => console.error(err),
    });
  };

  const handleClose = () => setShowModal(false);
  const handleOpen = () => setShowModal(true);

  return (
    <>
      <Modal tabIndex={-1} show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title id="txnModalLabel">Submit New Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="toUserAccount">
            <Form.Label>Receiving user account:</Form.Label>
            <Form.Control
              onChange={(e) => setUserAccount(e.target.value)}
              className="mb-2"
              placeholder="User account"
            />
          </Form.Group>
          <Form.Group controlId="toAmount">
            <Form.Label>Amount:</Form.Label>
            <Form.Control
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-secondary" onClick={submitTransaction}>
            Submit
          </Button>
          <Button className="btn-secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Button className="btn-secondary mt-2" onClick={handleOpen}>
        Submit New Transaction
      </Button>
    </>
  );
};

export default WalletAddTransactionModal;
