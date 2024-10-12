import styles from "./NewUser.module.css";
import ProfileForm from "../../components/Form/ProfileForm";
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
      <ProfileForm />
    </div>
  );
}

export default NewUser;
