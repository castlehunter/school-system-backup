import styles from "./MainTitle.module.css";
import icons from "../Icons/icons";

function MainTitle({ title }) {
  return (
    <div className={styles.mainTitle}>
      {/* <div className={styles.back}>
        {icons.ArrowBack(styles.arrowBack)} Back
      </div> */}
      <div>{title}</div>
      <div className={styles.separator} />
    </div>
  );
}

export default MainTitle;
