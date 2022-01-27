import { Button, Stack } from "react-bootstrap";
import { useMoralis } from "react-moralis";

const UserHeader = () => {
  const { user, logout } = useMoralis();

  return (
    <Stack direction="horizontal">
      <h1>
        Welcome {user && user.get("ethAddress").substring(0, 30) + "..."}!
      </h1>
      <Button
        className="btn-secondary"
        onClick={async () => {
          await logout();
          window.localStorage.removeItem("connectorId");
        }}
      >
        Logout
      </Button>
    </Stack>
  );
};

export default UserHeader;
