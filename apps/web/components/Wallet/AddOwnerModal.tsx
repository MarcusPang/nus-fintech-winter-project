import { useState } from "react";
import { useWeb3ExecuteFunction } from "react-moralis";
import styles from "../../styles/FullWidthButton.module.css";
import { createWalletFactoryOptions } from "../../utils/web3";

const OwnerModalForm = ({
  wallet,
  owners,
}: {
  wallet: string;
  owners: string[];
}) => {
  const [userAccount, setUserAccount] = useState("");
  const { fetch } = useWeb3ExecuteFunction();

  const addOwner = async () => {
    await fetch({
      params: createWalletFactoryOptions("addOwner", {
        wallet,
        newOwner: userAccount,
      }),
      onError: (e) => console.error(e),
      onSuccess: (results) => {
        console.log("Successfully added ", userAccount);
        console.log("[results]: ", results);
      },
    });
  };

  return (
    <div>
      <div
        className="modal fade"
        id="ownerModal"
        aria-labelledby="ownerModalLabel"
        aria-hidden="true"
        tabIndex={-1}
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="ownerModalLabel">
                Add Owner
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <label>User account:</label>
              <input
                onChange={(e) => setUserAccount(e.target.value)}
                placeholder="User account"
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
                onClick={addOwner}
              >
                Add Owner
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
          data-bs-target="#ownerModal"
        >
          Add Owner
        </button>
      </div>
    </div>
  );
};

export default OwnerModalForm;
