import generalStyles from "../../generalStyles.module.css";
function ContainerLayout({ children, title }) {
  return (
    <div className={generalStyles.container}>
      <div className={generalStyles.containerHeader}>
        <div className={generalStyles.primaryHeading}>{title}</div>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default ContainerLayout;
