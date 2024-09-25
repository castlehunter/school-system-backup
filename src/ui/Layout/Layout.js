import styles from "./Layout.module.css";
import SidebarNew from "../../components/Sidebar/SidebarNew";
import { RiMegaphoneLine } from "@remixicon/react";
import avatar from "../../assets/user-avatar.jpg";

function Layout({ children, breadcrumb }) {
  return (
    <main className={styles.layout}>
      <aside>
        <SidebarNew />
      </aside>

      <section>
        {/* The top section */}
        <div className={styles.header}>
          <div className={styles.breadcrumb}>{breadcrumb}</div>

          <div className={styles["user-section"]}>
            <div className={styles.announcement}>
              <RiMegaphoneLine className={styles["announcement-icon"]} />
              <div className={styles["announcement-count"]}>1</div>
            </div>

            <div className={styles["user-name"]}>
              <span className={styles.name}>Test Name</span>
              <span className={styles.identity}>Admin</span>
            </div>

            <img className={styles["user-avatar"]} src={avatar} alt="avatar" />
          </div>
        </div>

        {/* The main content */}
        <div className={styles.mainContent}>{children}</div>
      </section>
    </main>
  );
}

export default Layout;
