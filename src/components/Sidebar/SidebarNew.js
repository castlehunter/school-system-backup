import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./SidebarNew.module.css";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

function SidebarNew() {
  const PlusIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      style={{ marginRight: "0px" }}
    >
      <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144v144c0 17.7 14.3 32 32 32s32-14.3 32-32V288h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
    </svg>
  );
  const MinusIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      style={{ marginRight: "0px" }}
    >
      <path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
    </svg>
  );
  const CircleIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="none"
        stroke="white"
        stroke-width="2"
      />
    </svg>
  );
  const DashboardIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M3 13h8V3H3v10zm10 8h8V3h-8v18zm-10 0h8v-6H3v6z" />
    </svg>
  );
  const StudentIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );
  const CourseIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M21 3H3c-1.1 0-2 .9-2 2v14a2 2 0 002 2h18a2 2 0 002-2V5a2 2 0 00-2-2zM3 19V5h18v14H3zm4-6h2v2H7v-2zm-4 0h2v2H3v-2zm16 0h2v2h-2v-2zm-8 0h2v2h-2v-2zm4 0h2v2h-2v-2zm-8-4h2v2H7V9zm-4 0h2v2H3V9zm16 0h2v2h-2V9zm-8 0h2v2h-2V9zm4 0h2v2h-2V9z" />
    </svg>
  );
  const TeacherIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
  );
  const EnrollmentIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2zm-1 17.93C7.06 18.69 4 15.36 4 12c0-.47.05-.92.13-1.37L9 15v1c0 1.1.9 2 2 2v1.93zM12 4c1.83 0 3.54.67 4.88 1.76L5.76 16.88C4.67 15.54 4 13.83 4 12c0-4.42 3.58-8 8-8zm1 12h-1v-4h1v4zm0-6h-1V7h1v3z" />
    </svg>
  );
  const SearchIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={styles.searchBarIcon}
    >
      <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
    </svg>
  );

  const CloseIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 384 512"
      className={styles.searchBarIcon}
    >
      <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
    </svg>
  );
  const [openMenus, setOpenMenus] = useState({
    dashboard: true,
    student: true,
    program: true,
    course: true,
    teacher: true,
    enrollment: true,
  });

  function toggleMenu(menuName) {
    setOpenMenus((prevState) => {
      console.log("Previous State:", prevState);
      const newState = { ...prevState, [menuName]: !prevState[menuName] };
      console.log("New State:", newState);
      return newState;
    });
  }

  const [searchBarIcon, setSearchBarIcon] = useState(SearchIcon);
  const [searchQuery, setSearchQuery] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  const pageTitles = {
    "/dashboard/overview": "Overview",
    "/dashboard/account-setting": "Account Setting",
    "/student/student-list": "Student List",
    "/student/add-student": "Add Student",
    "/program/program-list": "Program List",
    // "/program/add-program": "Add Program",
    "/course/course-list": "Course List",
    "/course/new-course": "Add Course",
    "/teacher/teacher-list": "Teacher List",
    "/teacher/new-teacher": "New Teacher",
    "/enrollment/enrollment-list": "Enrollment List",
    "/enrollment/new-enrollment": "New Enrollment",
  };

  function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (query) {
      setSearchBarIcon(CloseIcon);
    } else {
      setSearchBarIcon(SearchIcon);
    }
    const filteredResults = Object.entries(pageTitles).filter(([path, title]) =>
      title.toLowerCase().includes(query)
    );

    setSearchResults(filteredResults);
  }

  return (
    // <div className={styles.sidebarWrapper}>
    <div className={styles.sidebar}>
      <Link to="/" className={styles.logoLink}>
        <div className={styles.logoContainer}>
          <img src={logo} alt="logo" className={styles.logoImage} />
          <span className={styles.logoText}>ABC Learning Centre</span>
        </div>
      </Link>

      <div className={styles.searchContainer}>
        <div className={styles.searchbar}>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search"
            className={styles.searchInput}
          />
          <div
            className={styles.searchBarIconWrapper}
            onClick={() => {
              setSearchQuery("");
              setSearchBarIcon(SearchIcon);
            }}
          >
            {searchBarIcon && <>{searchBarIcon}</>}
          </div>
        </div>
        {searchQuery && searchResults.length > 0 && (
          <div className={styles.dropdown}>
            {searchResults.map(([path, title]) => (
              <NavLink
                key={path}
                to={path}
                className={styles.dropdownItem}
                onClick={() => setSearchQuery("")}
              >
                {title}
              </NavLink>
            ))}
          </div>
        )}
      </div>
      <div className={styles.menu}>
        {/* Dashboard */}
        <div>
          <div
            className={styles.menuTitle}
            onClick={() => toggleMenu("dashboard")}
          >
            <div className={styles.menuText}>{DashboardIcon}Dashboard</div>
            {openMenus["dashboard"] ? MinusIcon : PlusIcon}
          </div>
          <div
            className={`${styles.menuContent} ${
              openMenus["dashboard"] ? styles.open : ""
            }`}
          >
            <NavLink
              to="/dashboard/overview"
              className={({ isActive }) =>
                isActive
                  ? `${styles.menuItem} ${styles.current}`
                  : styles.menuItem
              }
            >
              <div className={styles.menuText}>{CircleIcon}Overview</div>
            </NavLink>
            <NavLink
              to="/dashboard/account-setting"
              className={({ isActive }) =>
                isActive
                  ? `${styles.menuItem} ${styles.current}`
                  : styles.menuItem
              }
            >
              <div className={styles.menuText}>{CircleIcon}Account Setting</div>
            </NavLink>
          </div>
        </div>

        <div>
          <div
            className={styles.menuTitle}
            onClick={() => toggleMenu("mycourses")}
          >
            <div className={styles.menuText}>
              {StudentIcon}
              My Courses - for teacher/student
            </div>
            {openMenus["mycourses"] ? MinusIcon : PlusIcon}
          </div>
          <div
            className={`${styles.menuContent} ${
              openMenus["mycourses"] ? styles.open : ""
            }`}
          >
            <NavLink
              to="/my-courses/my-course-list"
              className={({ isActive }) =>
                isActive
                  ? `${styles.menuItem} ${styles.current}`
                  : styles.menuItem
              }
            >
              <div className={styles.menuText}>{CircleIcon}My Courses</div>
            </NavLink>
            <NavLink
              to="/student/add-student"
              className={({ isActive }) =>
                isActive
                  ? `${styles.menuItem} ${styles.current}`
                  : styles.menuItem
              }
            >
              <div className={styles.menuText}>{CircleIcon}My Courses</div>
            </NavLink>
          </div>
        </div>
        {/* Student */}
        <div>
          <div
            className={styles.menuTitle}
            onClick={() => toggleMenu("student")}
          >
            <div className={styles.menuText}>
              {StudentIcon}
              Students-for advisor, admin
            </div>
            {openMenus["student"] ? MinusIcon : PlusIcon}
          </div>
          <div
            className={`${styles.menuContent} ${
              openMenus["student"] ? styles.open : ""
            }`}
          >
            <NavLink
              to="/student/student-list"
              className={({ isActive }) =>
                isActive
                  ? `${styles.menuItem} ${styles.current}`
                  : styles.menuItem
              }
            >
              <div className={styles.menuText}>{CircleIcon}Student List</div>
            </NavLink>
            <NavLink
              to="/student/add-student"
              className={({ isActive }) =>
                isActive
                  ? `${styles.menuItem} ${styles.current}`
                  : styles.menuItem
              }
            >
              <div className={styles.menuText}>{CircleIcon}Add Student</div>
            </NavLink>
          </div>
        </div>

        {/* Program - not needed for learning center*/}
        {/* <div>
          <div
            className={styles.menuTitle}
            onClick={() => toggleMenu("program")}
          >
            <div className={styles.menuText}>{CourseIcon}Programs</div>
            {openMenus["program"] ? MinusIcon : PlusIcon}
          </div>
          <div
            className={`${styles.menuContent} ${
              openMenus["program"] ? styles.open : ""
            }`}
          >
            <NavLink
              to="/program/program-list"
              className={({ isActive }) =>
                isActive
                  ? `${styles.menuItem} ${styles.current}`
                  : styles.menuItem
              }
            >
              <div className={styles.menuText}>{CircleIcon}Program List</div>
            </NavLink>
            <NavLink
              to="/program/add-program"
              className={({ isActive }) =>
                isActive
                  ? `${styles.menuItem} ${styles.current}`
                  : styles.menuItem
              }
            >
              <div className={styles.menuText}>{CircleIcon}Add Program</div>
            </NavLink>
          </div>
        </div> */}

        {/* Course */}
        <div>
          <div
            className={styles.menuTitle}
            onClick={() => toggleMenu("course")}
          >
            <div className={styles.menuText}>{CourseIcon}Courses</div>
            {openMenus["course"] ? MinusIcon : PlusIcon}
          </div>
          <div
            className={`${styles.menuContent} ${
              openMenus["course"] ? styles.open : ""
            }`}
          >
            <NavLink
              to="/course/course-list"
              className={({ isActive }) =>
                isActive
                  ? `${styles.menuItem} ${styles.current}`
                  : styles.menuItem
              }
            >
              <div className={styles.menuText}>{CircleIcon}Course List</div>
            </NavLink>
            <NavLink
              to="/course/new-course"
              className={({ isActive }) =>
                isActive
                  ? `${styles.menuItem} ${styles.current}`
                  : styles.menuItem
              }
            >
              <div className={styles.menuText}>{CircleIcon}AddCourse</div>
            </NavLink>
          </div>
        </div>

        {/* Teacher */}
        <div>
          <div
            className={styles.menuTitle}
            onClick={() => toggleMenu("teacher")}
          >
            <div className={styles.menuText}>{TeacherIcon}Teachers</div>
            {openMenus["teacher"] ? MinusIcon : PlusIcon}
          </div>
          <div
            className={`${styles.menuContent} ${
              openMenus["teacher"] ? styles.open : ""
            }`}
          >
            <NavLink
              to="/teacher/teacher-list"
              className={({ isActive }) =>
                isActive
                  ? `${styles.menuItem} ${styles.current}`
                  : styles.menuItem
              }
            >
              <div className={styles.menuText}>{CircleIcon}Teacher List</div>
            </NavLink>
            <NavLink
              to="/teacher/new-teacher"
              className={({ isActive }) =>
                isActive
                  ? `${styles.menuItem} ${styles.current}`
                  : styles.menuItem
              }
            >
              <div className={styles.menuText}>{CircleIcon}New Teacher</div>
            </NavLink>
          </div>
        </div>

        {/* Enrollment */}
        <div>
          <div
            className={styles.menuTitle}
            onClick={() => toggleMenu("enrollment")}
          >
            <div>
              <div className={styles.menuText}>
                {EnrollmentIcon}
                Enrollment
              </div>
            </div>
            {openMenus["enrollment"] ? MinusIcon : PlusIcon}
          </div>
          <div
            className={`${styles.menuContent} ${
              openMenus["enrollment"] ? styles.open : ""
            }`}
          >
            <NavLink
              to="/enrollment/enrollment-list"
              className={({ isActive }) =>
                isActive
                  ? `${styles.menuItem} ${styles.current}`
                  : styles.menuItem
              }
            >
              <div className={styles.menuText}>{CircleIcon}Enrollment List</div>
            </NavLink>
            <NavLink
              to="/enrollment/new-enrollment"
              className={({ isActive }) =>
                isActive
                  ? `${styles.menuItem} ${styles.current}`
                  : styles.menuItem
              }
            >
              <div className={styles.menuText}>{CircleIcon}New Enrollment</div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default SidebarNew;
