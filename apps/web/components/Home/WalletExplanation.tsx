import Image from "next/image";
import { Accordion } from "react-bootstrap";

const WalletExplanation = () => {
  return (
    <Accordion style={{ marginBottom: 12 }}>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Click to see our wallet works!</Accordion.Header>
        <Accordion.Body>
          <Image
            src="/wallet_explanation.png"
            alt="Multi-Signature Wallet Explanation"
            width="832"
            height="642"
          />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default WalletExplanation;
