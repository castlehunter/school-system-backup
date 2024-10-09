import { Link } from "react-router-dom";
import styles from "./StatCard.module.css";
function StatCard({ number, unit, icon, bgcolor }) {
  return (
    <div className={`${styles.statcard} ${styles[bgcolor]}`}>
      <div className={styles.top}>
        <div className={styles.topText}>
          <h3>{number}</h3>
          <p>{unit}</p>
        </div>
        <div className={styles.icon}>{icon}</div>
      </div>
      <div className={styles.bottom}>
        <Link to="#" className={styles.moreinfo}>
          More info{" "}
          <i className={`ri-arrow-right-circle-line ${styles.arrow}`}></i>
        </Link>
      </div>
    </div>
  );
}

export default StatCard;
