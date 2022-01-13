import styles from "../../styles/DataRow.module.css";

const DataRow = (props) => {
  return (
    <div className={styles.dataRow}>
      <p>{props.text}</p>
      <button className="btn btn-secondary" onClick={props.clickHandler}>
        {props.buttonText}
      </button>
    </div>
  );
};

export default DataRow;
