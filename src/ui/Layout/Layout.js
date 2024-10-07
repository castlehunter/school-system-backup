import styles from "./Layout.module.css";
import SidebarNew from "../../components/Sidebar/SidebarNew";
import { RiMegaphoneLine } from "@remixicon/react";
import avatar from "../../assets/user-avatar-header.jpg";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/*****************************************************************
 * To do features for the Avanta Dropdown Menu:
 * 1. Replace the hardcoded user name in the Avanta Menu with the actual
 *    logged-in user's name, based on their account information.
 * 2. Discuss and finalize which dropdown menu items are necessary for this section.
 *
 *****************************************************************/
function Layout({ children, breadcrumb }) {
  const [isOpen, setIsOpen] = useState(false); // Manager menu display status
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  // Close the menu when clicking on elsewhere on the page
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const handleMenuItemClick = () => {
    setIsOpen(false);
  };

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

            <div className={styles["user-avatar-container"]} ref={menuRef}>
              <div className={styles["user-avatar"]} onClick={toggleMenu}>
                <img src={avatar} alt="avatar" />
              </div>
              {/* dropdown menu */}
              {isOpen && (
                <div className={styles["dropdown-menu"]}>
                  <p>User Name</p>
                  <ul>
                    <Link
                      to="/dashboard/my-account"
                      onClick={handleMenuItemClick}
                    >
                      <li>My Account</li>
                    </Link>
                    <Link to="/" onClick={handleMenuItemClick}>
                      <li>Sign Out</li>
                    </Link>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* The main content */}
        <div className={styles.mainContent}>{children}</div>
      </section>
    </main>
  );
}

export default Layout;
