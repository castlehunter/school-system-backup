import generalStyles from "../../generalStyles.module.css";
import Button from "../../components/Button/Button";

function EditContainer({
  children,
  title,
  editButtonText,
  isEdit = false,
  onClickEdit,
  onClickSave,
  onClickCancel,
  onClickDelete,
}) {
  return (
    <div className={generalStyles.container}>
      <div className={generalStyles.containerHeader}>
        {title && <div className={generalStyles.containerHeading}>{title}</div>}
        {editButtonText && (
          <div className={generalStyles.editContainerButtons}>
            {isEdit ? (
              <>
                <Button onClickBtn={onClickSave} size="small">
                  Save
                </Button>
                <span style={{ marginLeft: "2rem" }}>
                  <Button onClickBtn={onClickCancel} size="small">
                    Cancel
                  </Button>
                </span>
              </>
            ) : (
              <Button onClickBtn={onClickEdit} size="small">
                {editButtonText}
              </Button>
            )}
            {onClickDelete && (
              <Button onClickBtn={onClickDelete} color="blue">
                Delete
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
