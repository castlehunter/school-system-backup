import styles from "./Button.module.css";

function Button({ children, onClickBtn, onClickEditBtn, size = "small" }) {
  return (
    <button onClick={onClickBtn || onClickEditBtn} className={`${styles.btn} ${styles[size]}`}>
      {children}
    </button>
  );
}

export default Button;
