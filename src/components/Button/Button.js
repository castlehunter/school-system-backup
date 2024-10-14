import styles from "./Button.module.css";

function Button({ children, onClickBtn, size = "small" }) {
  return (
    <button onClick={onClickBtn} className={`${styles.btn} ${styles[size]}`}>
      {children}
    </button>
  );
}

export default Button;
