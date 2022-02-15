import { Button, Nav } from "react-bootstrap";
import { useMoralis } from "react-moralis";
import styles from "../../styles/index.module.css";
import CustomNavLink from "./CustomNavLink";
import WalletSidebar from "./WalletSidebar";

const Sidebar = () => {
  const { logout } = useMoralis();
  return (
    <Nav
      style={{
        height: "100%",
        boxShadow: "5px 5px 5px lightgrey",
        background: "#f7f5f5",
        position: "fixed",
        top: 0,
        left: 0,
        width: "15%",
        display: "flex",
        flexDirection: "column",
        paddingTop: 20,
        zIndex: 1,
      }}
    >
      <Nav.Item className={styles.sideBarTab}>
        <CustomNavLink href="/">Home</CustomNavLink>
      </Nav.Item>
      <WalletSidebar />
      <Nav.Item className={styles.sideBarTab}>
        <CustomNavLink href="/wallet/new">Create New Wallet</CustomNavLink>
      </Nav.Item>

      <Button
        className="btn-secondary w-75 mx-auto mt-3"
        onClick={async () => {
          await logout();
          window.localStorage.removeItem("connectorId");
        }}
      >
        Logout
      </Button>
    </Nav>
  );
};

export default Sidebar;
