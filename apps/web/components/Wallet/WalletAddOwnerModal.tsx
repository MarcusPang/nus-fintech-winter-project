import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useWeb3ExecuteFunction } from "react-moralis";
import { createWalletFactoryOptions } from "../../utils/web3";

const WalletAddOwnerModal = ({ wallet }: { wallet: string }) => {
  const [userAccount, setUserAccount] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { fetch } = useWeb3ExecuteFunction();

  const addOwner = async () => {
    await fetch({
      params: createWalletFactoryOptions("addOwner", {
        wallet,
        newOwner: userAccount,
      }),
    });
  };

  const handleClose = () => setShowModal(false);
  const handleOpen = () => setShowModal(true);

  return (
    <>
      <Modal tabIndex={-1} show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Owner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="userAccount">
            <Form.Label>User account:</Form.Label>
            <Form.Control
              onChange={(e) => setUserAccount(e.target.value)}
              placeholder="User account"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-secondary" onClick={addOwner}>
            Add Owner
          </Button>
          <Button className="btn-secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Button className={"btn-secondary mt-2 mb-4"} onClick={handleOpen}>
        Add Owner
      </Button>
    </>
  );
};

export default WalletAddOwnerModal;
