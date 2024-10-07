import styles from "./StatCard.module.css";
function StatCard({ number, unit, icon, bgcolor }) {
  return (
    <div className={`${styles.statcard} ${styles[bgcolor]}`}>
      <div className={styles.inner}>
        <h3>{number}</h3>
        <p>{unit}</p>
      </div>
      <a href="#">
        More info <i class="ri-arrow-right-circle-line"></i>
      </a>
      <p>lorem lorem</p>
      <p>lorem lorem</p>
      <p>lorem lorem</p>
      <p>lorem lorem</p>
      <p>lorem lorem</p>
    </div>
  );
}

export default StatCard;
