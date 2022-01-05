import styles from '../styles/FullWidthButton.module.css';

const FullWidthButton = (props) => {
  return (
    <div className={styles.buttonDiv}>
      <button className="btn btn-secondary" onClick={props.clickHandler}>{props.text}</button>
    </div>
  );
};

export default FullWidthButton;
