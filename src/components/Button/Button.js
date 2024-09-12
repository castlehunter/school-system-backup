import styles from "./Button.module.css";

function Button({ children, onClick, colorType }) {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[colorType]}`}>
      {children}
    </button>
  );
}

export default Button;
