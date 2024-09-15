import styles from "./Button.module.css";

function Button({ children, onClick, size }) {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[size]}`}>
      {children}
    </button>
  );
}

export default Button;
