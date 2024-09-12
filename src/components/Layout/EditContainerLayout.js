import generalStyles from "../../generalStyles.module.css";
import Button from "../Button/Button";
function EditContainerLayout({
  children,
  title,
  isEdit,
  onClickEdit,
  onClickConfirm,
  onClickCancel,
}) {
  return (
    <div className={generalStyles.container}>
      <div className={generalStyles.containerHeader}>
        <div className={generalStyles.primaryHeading}>{title}</div>
        <div>
          {isEdit ? (
            <>
              <Button onClick={onClickConfirm}>Confirm</Button>
              <span style={{ marginLeft: "1rem" }}>
                {" "}
                <Button onClick={onClickCancel}>Cancel</Button>
              </span>
            </>
          ) : (
            <Button onClick={onClickEdit}>Edit</Button>
          )}
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default EditContainerLayout;
