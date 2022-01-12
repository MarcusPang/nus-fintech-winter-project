import Image from "next/image";
import styles from "../styles/WalletExplanation.module.css";

const WalletExplanation = () => {
  return (
    <div>
      {/* <p>
        <button
          className="btn btn-secondary"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#walletExplanation"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          Multi Sig Wallet Explanation
        </button>
      </p>
      <div className="collapse" id="walletExplanation"> */}
      <div className={styles.imageDiv}>
        <Image
          src="/wallet_explanation.png"
          alt="Multi-Signature Wallet Explanation"
          width="832"
          height="642"
        />
      </div>
      {/* </div> */}
    </div>
  );
};

export default WalletExplanation;
