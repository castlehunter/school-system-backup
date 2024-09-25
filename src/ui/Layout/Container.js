import generalStyles from "../../generalStyles.module.css";

// This container is a genearl container (without edit button)
function ContainerLayout({ children, title, headingType }) {
  return (
    <div className={generalStyles.container}>
      <div className={generalStyles.containerHeader}>
        <div className={generalStyles[headingType]}>{title}</div>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default ContainerLayout;
