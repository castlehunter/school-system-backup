import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./SidebarNew.module.css";
import logo from "../../assets/logo.png";
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

function SidebarNew() {
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
    "my courses": true,
    students: true,
    courses: true,
    teachers: true,
    programs: true,
  });

  const menuItems = [
    {
      title: "Dashboard",
      icon: icons.DashboardIcon,
      subItems: [
        { path: "/dashboard/overview", label: "Overview" },
        { path: "/dashboard/my-account", label: "My Account" },
      ],
    },
    {
      title: "My Courses",
      icon: icons.MyCoursesIcon,
      subItems: [
        { path: "/my-courses/my-course-list", label: "My Course List" },
      ],
    },
    {
      title: "Students",
      icon: icons.StudentIcon,
      subItems: [
        { path: "/student/student-list", label: "Student List" },
        { path: "/student/add-student", label: "Add Student" },
      ],
    },
    {
      title: "Courses",
      icon: icons.CourseIcon,
      subItems: [
        { path: "/course/course-list", label: "Course List" },
        { path: "/course/new-course", label: "Add Course" },
      ],
    },
    {
      title: "Teachers",
      icon: icons.TeacherIcon,
      subItems: [
        { path: "/teacher/teacher-list", label: "Teacher List" },
        { path: "/teacher/add-teacher", label: "Add Teacher" },
      ],
    },
    {
      title: "Programs",
      icon: icons.EnrollmentIcon,
      subItems: [
        { path: "/program/program-list", label: "Program List" },
        { path: "/program/new-program", label: "New Program" },
      ],
    },
  ];

  const searchItems = menuItems.flatMap((item) => item.subItems);

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
          <span className={styles.logoText}>ABC Learning Centre</span>
        </div>
      </Link>

      <Search searchItems={searchItems} colorType="dark" />

      <div className={styles.menu}>
        {menuItems.map((menu) => (
          <div key={menu.title}>
            <div
              className={styles.menuTitle}
              onClick={() => toggleMenu(menu.title.toLowerCase())}
            >
              <div className={styles.menuText}>
                {menu.icon}
                {menu.title}
              </div>
              {openMenus[menu.title.toLowerCase()]
                ? icons.MinusIcon
                : icons.PlusIcon}
            </div>
            <div
              className={`${styles.menuContent} ${
                openMenus[menu.title.toLowerCase()] ? styles.open : ""
              }`}
            >
              {menu.subItems.map((subItem) => (
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
                    {subItem.label}
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
