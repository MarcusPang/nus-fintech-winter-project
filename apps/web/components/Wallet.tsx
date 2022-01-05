import styles from '../styles/Wallet.module.css';
import DataRow from './DataRow';
import FullWidthButton from './FullWidthButton';
import OwnerModalForm from "./OwnerModalForm";
import TransactionModalForm from './TransactionModalForm';

const owners = ["0xSAM", "0xTIM", "0xLINDA"]
const transactions = ["Request to send 2 ETH from 0xTIM to 0xJACK", "Request to send 1 ETH from 0xSAM to 0xJACK", "Request to send 500 ETH from 0xSAM to 0xLILY"]

function onDeleteOwner () {

}

function onApproveTransaction () {

}


const Wallet = () => {
  return (
    <div className={styles.wallet}>
      <h3><b>Wallet Address: </b> 0xWALLETXYZ</h3>
      <p><b>Owners:</b></p>
      {owners.map((owner, index) => (<DataRow text={owner} buttonText="Delete" key={index} clickHandler={onDeleteOwner}/>))}
      <OwnerModalForm />
      <p><b>Percentage confirmation:</b> 50%</p>
      <p><b>Active transactions:</b></p>
      {transactions.map((txn, index) => (<DataRow text={txn} buttonText="Approve transaction" key={index} clickHandler={onApproveTransaction} />))}
      <TransactionModalForm />
    </div>
  );
};

export default Wallet;
