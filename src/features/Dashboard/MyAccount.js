import styles from "./MyAccount.module.css";
import PersonalInfoForm from "../../components/Form/ProfileInfoForm";
import AccountInfoForm from "../../components/Form/AccountInfoForm";
import SecurityInfoForm from "../../components/Form/SecurityInfoForm";
import { useUser } from "../../contexts/UserContext";

/*************************************************
 * Tasks to be completed:
 * 1. Avatar:
 *    1) Supabase Users table lacks avatar data, currently using a local image
 *    2) Update and save the new avatar to database
 * 2. Replace hardcoded userId=4 with dynamic user ID

 *************************************************/
function MyAccount() {
  const { userNo } = useUser();
  return (
    <>
      <h1>My Account</h1>
      <div className={styles.myAccountLayout}>
        <PersonalInfoForm userNo={userNo} />
        <SecurityInfoForm userNo={userNo} />
        <AccountInfoForm userNo={userNo} />
      </div>
    </>
  );
}

export default MyAccount;
