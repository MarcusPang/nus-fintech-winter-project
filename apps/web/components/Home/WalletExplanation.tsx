import Image from "next/image";
import { Accordion } from "react-bootstrap";
import styles from "../../styles/WalletExplanation.module.css";

const WalletExplanation = () => {
  return (
    <Accordion>
      <Accordion.Item eventKey="0">Wallet Explanation</Accordion.Item>
      <Accordion.Body>
        <div className={styles.imageDiv}>
          <Image
            src="/wallet_explanation.png"
            alt="Multi-Signature Wallet Explanation"
            width="832"
            height="642"
          />
        </div>
      </Accordion.Body>
    </Accordion>
  );
};

export default WalletExplanation;
