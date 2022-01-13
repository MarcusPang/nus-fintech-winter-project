import { useState } from "react";
import styles from "../../styles/FullWidthButton.module.css";

function submitTxn() {}

const TransactionModalForm = (props) => {
  const [userAccount, setUserAccount] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div>
      <div
        className="modal fade"
        id="txnModal"
        aria-labelledby="txnModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="txnModalLabel">
                Submit New Transaction
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <label>Receiving user account:</label>
              <input
                onChange={(e) => setUserAccount(e.target.value)}
                placeholder="User account"
              />
              <br></br>
              <label>Amount:</label>
              <input
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={submitTxn}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.buttonDiv}>
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-toggle="modal"
          data-bs-target="#txnModal"
        >
          Submit New Transaction
        </button>
      </div>
    </div>
  );
};

export default TransactionModalForm;
