import generalStyles from "../../generalStyles.module.css";

function Container({ children, title, headingType = "secondaryHeading" }) {
  return (
    <div className={generalStyles.container}>
      <div className={generalStyles.containerHeader}>
        <div className={generalStyles[headingType]}>{title}</div>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default Container;
