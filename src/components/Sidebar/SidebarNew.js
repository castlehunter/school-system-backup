import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "./SidebarNew.module.css";
import logo from "../../assets/logo-removebg-preview.png";
import { Link } from "react-router-dom";
import Search from "../Search/Search";
import {
  RiAddLine,
  RiSubtractLine,
  RiLogoutCircleLine,
  RiCircleLine,
  RiDashboardLine,
  RiBookReadLine,
  RiGraduationCapLine,
  RiUserLine,
  RiCalendarTodoLine,
  RiDraftLine,
} from "@remixicon/react";
import { useLoaderData } from "react-router-dom";

function SidebarNew() {
  const routes = useLoaderData();
  const menuItems = routes[1].children.filter((e) => e.path !== "*");

  const icons = {
    PlusIcon: <RiAddLine />,
    MinusIcon: <RiSubtractLine />,
    CircleIcon: <RiCircleLine />,
    DashboardIcon: <RiDashboardLine />,
    MyCoursesIcon: <RiCalendarTodoLine />,
    StudentIcon: <RiGraduationCapLine />,
    CourseIcon: <RiBookReadLine />,
    TeacherIcon: <RiUserLine />,
    EnrollmentIcon: <RiDraftLine />,
  };

  const [openMenus, setOpenMenus] = useState({
    dashboard: true,
    users: true,
    "my courses": true,
    students: true,
    courses: true,
    teachers: true,
    programs: true,
    enrollments: true,
  });

  // Filter menu item logic
  const [loginRole, setLoginRole] = useState("");

  // hard code initial state for testing only //////////////////////////
  useEffect(() => {
    // Pull localstorage role information
    const role = localStorage.getItem("role");
    setLoginRole("Administrator");
  }, []);

  const filteredMenuItems = menuItems.filter((menuObj) => {
    if (loginRole === "Administrator") {
      return true;
    } else if (loginRole === "Advisor") {
      return (
        menuObj.title === "Dashboard" ||
        menuObj.title === "Students" ||
        menuObj.title === "Courses" ||
        menuObj.title === "Teachers" ||
        menuObj.title === "Programs" ||
        menuObj.title === "Enrollments"
      );
    } else if (loginRole === "Teacher") {
      return menuObj.title === "Dashboard" || menuObj.title === "My Courses";
    } else if (loginRole === "Student") {
      return (
        menuObj.title === "Dashboard" ||
        menuObj.title === "My Courses" ||
        menuObj.title === "Enrollments"
      );
    }
    return true;
  });

  console.log("Filtered Menu Items", filteredMenuItems);

  const searchItems = menuItems
    .flatMap((item) => item.children)
    .filter((e) => !e.index);

  function toggleMenu(menuName) {
    setOpenMenus((prevState) => ({
      ...prevState,
      [menuName]: !prevState[menuName],
    }));
  }

  return (
    <div className={styles.sidebar}>
      <Link to="/" className={styles.logoLink}>
        <div className={styles.logoContainer}>
          <img src={logo} alt="logo" className={styles.logoImage} />
          {/* <span className={styles.logoText}>ABC Learning Centre</span> */}
        </div>
      </Link>
      <Search searchItems={searchItems} colorType="dark" />
      <div className={styles.menu}>
        {filteredMenuItems.map((menuObj) => (
          <div key={menuObj.title}>
            <div
              className={styles.menuTitle}
              onClick={() => toggleMenu(menuObj.title.toLowerCase())}
            >
              <div className={styles.menuText}>
                {menuObj.icon}
                {menuObj.title}
              </div>
              {openMenus[menuObj.title.toLowerCase()]
                ? icons.MinusIcon
                : icons.PlusIcon}
            </div>
            <div
              className={`${styles.menuContent} ${
                openMenus[menuObj.title.toLowerCase()] ? styles.open : ""
              }`}
            >
              {menuObj.children
                .filter((subItem) => subItem.hideInSidebar !== true)
                .filter((subItem) => !subItem.index)
                .map((subItem) => (
                  <NavLink
                    key={subItem.path}
                    to={subItem.path}
                    className={({ isActive }) =>
                      isActive
                        ? `${styles.menuItem} ${styles.current}`
                        : styles.menuItem
                    }
                  >
                    <div className={styles.menuText}>
                      {icons.CircleIcon}
                      {subItem.title}
                    </div>
                  </NavLink>
                ))}
            </div>
          </div>
        ))}
      </div>
      <Link to="/" className={styles.logout}>
        <RiLogoutCircleLine />
        <span>Logout</span>
      </Link>
    </div>
  );
}

export default SidebarNew;
