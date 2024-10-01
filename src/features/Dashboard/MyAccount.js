import styles from "./MyAccount.module.css";
import PersonalInfoForm from "../../components/Form/ProfileInfoForm";
import AccountInfoForm from "../../components/Form/AccountInfoForm";
import SecurityInfoForm from "../../components/Form/SecurityInfoForm";

/*************************************************
 * Tasks to be completed:
 * 1. Avatar:
 *    1) Supabase Users table lacks avatar data, currently using a local image
 *    2) Update and save the new avatar to database
 * 2. Replace hardcoded userId=4 with dynamic user ID

 *************************************************/
function MyAccount() {
  return (
    <div className={styles.myAccountLayout}>
      <PersonalInfoForm />
      <SecurityInfoForm />
      <AccountInfoForm />
    </div>
  );
}

export default MyAccount;
