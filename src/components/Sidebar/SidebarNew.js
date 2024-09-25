import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./SidebarNew.module.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import Search from "../Search/Search";

function SidebarNew() {
  const icons = {
    PlusIcon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        style={{ marginRight: "0px" }}
      >
        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144v144c0 17.7 14.3 32 32 32s32-14.3 32-32V288h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
      </svg>
    ),
    MinusIcon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        style={{ marginRight: "0px" }}
      >
        <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
      </svg>
    ),
    CircleIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <circle
          cx="12"
          cy="12"
          r="10"
          fill="none"
          stroke="white"
          strokeWidth="2"
        />
      </svg>
    ),
    DashboardIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M3 13h8V3H3v10zm10 8h8V3h-8v18zm-10 0h8v-6H3v6z" />
      </svg>
    ),
    MyCoursesIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M3 13h8V3H3v10zm10 8h8V3h-8v18zm-10 0h8v-6H3v6z" />
      </svg>
    ),
    StudentIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    ),
    CourseIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M21 3H3c-1.1 0-2 .9-2 2v14a2 2 0 002 2h18a2 2 0 002-2V5a2 2 0 00-2-2zM3 19V5h18v14H3zm4-6h2v2H7v-2zm-4 0h2v2H3v-2zm16 0h2v2h-2v-2zm-8 0h2v2h-2v-2zm4 0h2v2h-2v-2zm-8-4h2v2H7V9zm-4 0h2v2H3V9zm16 0h2v2h-2V9zm-8 0h2v2h-2V9zm4 0h2v2h-2V9z" />
      </svg>
    ),
    TeacherIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
      </svg>
    ),
    EnrollmentIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2zm-1 17.93C7.06 18.69 4 15.36 4 12c0-.47.05-.92.13-1.37L9 15v1c0 1.1.9 2 2 2v1.93zM12 4c1.83 0 3.54.67 4.88 1.76L5.76 16.88C4.67 15.54 4 13.83 4 12c0-4.42 3.58-8 8-8zm1 12h-1v-4h1v4zm0-6h-1V7h1v3z" />
      </svg>
    ),
  };

  const [openMenus, setOpenMenus] = useState({
    dashboard: true,
    "my courses": true,
    students: true,
    courses: true,
    teachers: true,
    enrollments: true,
  });

  const menuItems = [
    {
      title: "Dashboard",
      icon: icons.DashboardIcon,
      subItems: [
        { path: "/dashboard/overview", label: "Overview" },
        { path: "/dashboard/account-setting", label: "Account Setting" },
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
      title: "Enrollments",
      icon: icons.EnrollmentIcon,
      subItems: [
        { path: "/enrollment/enrollment-list", label: "Enrollment List" },
        { path: "/enrollment/new-enrollment", label: "New Enrollment" },
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
    </div>
  );
}

export default SidebarNew;
