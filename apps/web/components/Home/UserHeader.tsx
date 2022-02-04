import { Stack } from "react-bootstrap";
import { useMoralis } from "react-moralis";

const UserHeader = () => {
  const { user, logout } = useMoralis();

  return (
    <Stack direction="horizontal" style={{ justifyContent: "space-between" }}>
      <h1>
        {/* Welcome {user && user.get("ethAddress").substring(0, 30) + "..."}! */}
        Welcome!
      </h1>
    </Stack>
  );
};

export default UserHeader;
