import { useRouter } from "next/router";
import styles from "../../styles/index.module.css";

interface WalletSidebarInterface {
  wallets: string[] | null;
  isLoading: boolean;
}

const WalletSidebar = ({ wallets, isLoading }: WalletSidebarInterface) => {
  const router = useRouter();

  if (!isLoading && wallets) {
    return (
      <>
        {wallets.map((wallet, key) => (
          <button
            className={styles.sideBarTab}
            key={key}
            onClick={() => router.push("/wallet/" + wallet)}
          >
            {wallet.substring(0, 15) + "..."}
          </button>
        ))}
      </>
    );
  }
  return <div className="loading"></div>;
};

export default WalletSidebar;
