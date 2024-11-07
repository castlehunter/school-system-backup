import styles from "./Layout.module.css";
import SidebarNew from "../../components/Sidebar/SidebarNew";
import { RiMegaphoneLine } from "@remixicon/react";
import avatar from "../../assets/user-avatar-header.jpg";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getRoleNameByNo, getFullNameByNo } from "../../services/apiUser";

function Layout({ children, breadcrumb, userNo }) {
  const [isOpen, setIsOpen] = useState(false); // Manager menu display status
  const menuRef = useRef(null);
  const [roleName, setRoleName] = useState(null);
  const [fullName, setFullName] = useState(null);

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

  // Get role name
  useEffect(() => {
    const getRoleName = async () => {
      try {
        const role = await getRoleNameByNo(userNo);
        setRoleName(role);
      } catch (error) {
        console.error("Error fetching role name:", error);
      }
    };

    getRoleName();
  }, [userNo]);

  // Get full name
  useEffect(() => {
    const getFullName = async () => {
      try {
        const role = await getFullNameByNo(userNo);
        setFullName(role);
      } catch (error) {
        console.error("Error fetching full name:", error);
      }
    };

    getFullName();
  }, [userNo]);

  return (
    <main className={styles.layout}>
      <aside>
        <SidebarNew />
      </aside>

      <section>
        {/* ================ The top section ===============*/}
        <div className={styles.header}>
          <div className={styles.breadcrumb}>{breadcrumb}</div>

          <div className={styles["user-section"]}>
            <div className={styles.announcement}>
              <RiMegaphoneLine className={styles["announcement-icon"]} />
              <div className={styles["announcement-count"]}>1</div>
            </div>

            <div className={styles.nameRole}>
              <div className={styles.name}>{fullName}</div>
              <div className={styles.role}>{roleName}</div>
            </div>

            <div className={styles["user-avatar-container"]} ref={menuRef}>
              <div className={styles["user-avatar"]} onClick={toggleMenu}>
                <img src={avatar} alt="avatar" />
              </div>
              {/* dropdown menu */}
              {isOpen && (
                <div className={styles["dropdown-menu"]}>
                  <p>{fullName}</p>
                  <ul>
                    <Link
                      to="/dashboard/my-account"
                      onClick={handleMenuItemClick}
                    >
                      <li>My Account</li>
                    </Link>
                    {/* <Link
                      to="/dashboard/help-and-support"
                      onClick={handleMenuItemClick}
                    >
                      <li>Help/Support</li>
                    </Link> */}
                    <Link to="/" onClick={handleMenuItemClick}>
                      <li>Sign Out</li>
                    </Link>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ================== The main content ================*/}
        <div className={styles.mainContent}>{children}</div>
      </section>
    </main>
  );
}

export default Layout;
