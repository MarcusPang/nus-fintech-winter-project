import { useState } from "react";
import styles from '../styles/FullWidthButton.module.css';

function addOwner () {

}

const OwnerModalForm = (props) => {
  const [userAccount, setUserAccount] = useState("");

  return (
    <div>
      <div className="modal fade" id="ownerModal" aria-labelledby="ownerModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="ownerModalLabel">Add Owner</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <label>User accounts:</label>
              <input
                onChange={(e) => setUserAccount(e.target.value)}
                placeholder="User account"
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-secondary" onClick={addOwner}>Add Owner</button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.buttonDiv}>
        <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#ownerModal">
          Add Owner
        </button>
      </div>
    </div>
  );
};

export default OwnerModalForm;
