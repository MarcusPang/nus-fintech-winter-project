import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import {
  useMoralis,
  useWeb3ExecuteFunction,
  useWeb3Transfer,
} from "react-moralis";
import { createWalletFactoryOptions } from "../../utils/web3";

const WalletAddAmountModal = ({ wallet }: { wallet: string }) => {
  const [amount, setAmount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const { fetch } = useWeb3Transfer();
  const { Moralis } = useMoralis();

  const addETH = () => {
    fetch({
      params: {
        amount: Moralis.Units.ETH(amount),
        contractAddress: wallet,
        receiver: wallet,
        type: "native",
      },
      onError: (err) => console.error(err),
      onSuccess: (res) => console.log(res),
    });
  };

  const handleClose = () => setShowModal(false);
  const handleOpen = () => setShowModal(true);

  return (
    <>
      <Modal tabIndex={-1} show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add ETH</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="walletAmount">
            <Form.Label>Amount (in ETH):</Form.Label>
            <Form.Control
              onChange={(e) => setAmount(+e.target.value)}
              type="number"
              placeholder="Amount"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-secondary" type="submit" onClick={addETH}>
            Add ETH
          </Button>
          <Button className="btn-secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Button className={"btn"} onClick={handleOpen}>
        Add ETH
      </Button>
    </>
  );
};

export default WalletAddAmountModal;
