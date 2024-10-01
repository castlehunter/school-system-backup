import styles from "./NewUser.module.css";
import PersonalInfoForm from "../../components/Form/ProfileInfoForm";
import AccountInfoForm from "../../components/Form/AccountInfoForm";
import SecurityInfoForm from "../../components/Form/SecurityInfoForm";
import Button from "../../components/Button/Button";

/*************************************************
 * Tasks to be completed:
 * 1. Avatar:
 *    1) Supabase Users table lacks avatar data, currently using a local image
 *    2) Update and save the new avatar to database
 * 2. Replace hardcoded userId=4 with dynamic user ID

 *************************************************/
function NewUser() {
  return (
    <div className={styles.layout}>
      <PersonalInfoForm showEditButton={false} />
      <SecurityInfoForm showEditButton={false} />
      <AccountInfoForm showEditButton={false} />
      <div className={styles.buttonLayout}>
        <div className={styles.buttons}>
          <Button size="large">Create</Button>
          <Button size="large">Cancel</Button>
        </div>
      </div>
    </div>
  );
}

export default NewUser;
