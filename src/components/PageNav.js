import styles from "./PageNav.module.css";
import logo from "../assets/logo.png";

function PageNav({ bgColor = "" }) {
  return (
    <nav className={styles.navigationBar} style={{ backgroundColor: bgColor }}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
        <span className={styles.logoText}>School Management System</span>
      </div>
    </nav>
  );
}

export default PageNav;
