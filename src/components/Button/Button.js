import styles from "./Button.module.css";

function Button({ children, onClickBtn, size = "small",type = "button" }) {
  return (
    <button onClick={onClickBtn} className={`${styles.btn} ${styles[size]}`} type={type}>
      {children}
    </button>
  );
}

export default Button;
