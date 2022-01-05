import Wallet from './Wallet';
import styles from '../styles/MyWalletsComponent.module.css';

const MyWalletsComponent = () => {
  return (
    <div className={styles.myWallets}>
      <h2>My Wallets</h2>
      <Wallet />
    </div>
  );
};

export default MyWalletsComponent;
