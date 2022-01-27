import { useCallback, useEffect, useState } from "react";
import { useWeb3ExecuteFunction } from "react-moralis";
import { createWalletFactoryOptions } from "../../utils/web3";
import WalletOwnerRow from "./WalletOwnerRow";

interface WalletOwnersProps {
  wallet: string;
}

const WalletOwners = ({ wallet }: WalletOwnersProps) => {
  const [owners, setOwners] = useState<string[]>([]);
  const { fetch: ownerFetch } = useWeb3ExecuteFunction();
  const { fetch: removeOwnerFetch } = useWeb3ExecuteFunction();

  useEffect(() => {
    ownerFetch({
      params: createWalletFactoryOptions("getOwners", {
        wallet,
      }),
      onSuccess: (res: string[]) => setOwners(res),
    });
    return () => {
      setOwners([]);
    };
  }, [wallet]);

  const deleteOwner = useCallback(async (owner: string) => {
    await removeOwnerFetch({
      params: createWalletFactoryOptions("removeOwner", {
        wallet,
        existingOwner: owner,
      }),
      onError: (e) => console.error("failed to delete owner ", e),
      onSuccess: (results) => {
        console.log("Successfully deleted ", owner);
        console.log("[results]: ", results);
      },
    });
  }, []);

  return (
    <>
      {owners.map((owner, index) => (
        <WalletOwnerRow
          text={owner}
          buttonText="Delete"
          key={index}
          clickHandler={() => deleteOwner(owner)}
        />
      ))}
    </>
  );
};

export default WalletOwners;
