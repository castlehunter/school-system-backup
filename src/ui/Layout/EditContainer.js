import generalStyles from "../../generalStyles.module.css";
import Button from "../../components/Button/Button";

function EditContainer({
  children,
  title,
  editBtnText,
  isEdit = false,
  onClickEdit,
  onClickSave,
  onClickCancel,
}) {
  return (
    <div className={generalStyles.container}>
      <div className={generalStyles.containerHeader}>
        <div className={generalStyles.containerHeading}>{title}</div>
        {editBtnText && (
          <div>
            {isEdit ? (
              <>
                <Button onClickBtn={onClickSave} size="small">
                  Save
                </Button>
                <span style={{ marginLeft: "1rem" }}>
                  <Button onClickBtn={onClickCancel} size="small">
                    Cancel
                  </Button>
                </span>
              </>
            ) : (
              <Button onClickBtn={onClickEdit} size="small">
                {editBtnText}
              </Button>
            )}
          </div>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
}

export default EditContainer;
