import { Button } from "react-bootstrap";
import styles from "../../styles/DataRow.module.css";

interface OwnerRowProps {
  text: string;
  clickHandler: () => void;
  buttonText: string;
}

const WalletOwnerRow = ({ text, clickHandler, buttonText }: OwnerRowProps) => {
  return (
    <div className={styles.dataRow}>
      <p>{text}</p>
      <Button className="btn-secondary" onClick={clickHandler}>
        {buttonText}
      </Button>
    </div>
  );
};

export default WalletOwnerRow;
