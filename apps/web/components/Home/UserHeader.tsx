import { useMoralis } from "react-moralis";
import styles from "../../styles/UserHeader.module.css";

const UserHeader = () => {
  const { user, logout } = useMoralis();

  return (
    <div className={styles.user}>
      <h1>Welcome {user.get("ethAddress")}!</h1>
      <button
        className="btn btn-secondary"
        onClick={async () => {
          await logout();
          window.localStorage.removeItem("connectorId");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default UserHeader;
