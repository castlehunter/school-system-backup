import { useState, useEffect } from "react";
import { NavLink, Link, useLoaderData } from "react-router-dom";
import styles from "./SidebarNew.module.css";
import logo from "../../assets/logo-removebg-preview.png";
import Search from "../Search/Search";
import icons from "../../ui/Icons/icons";
import { getUserByID } from "../../services/apiUser";
import supabase from "../../config/supabaseClient";

function SidebarNew() {
  const routes = useLoaderData();

  const menuItemWithChildren = routes.find((route) => route.children);

  const menuItems = menuItemWithChildren
    ? menuItemWithChildren.children.filter((e) => e.path !== "*")
    : [];

  const [openMenus, setOpenMenus] = useState({
    dashboard: true,
    users: true,
    "my courses": true,
    "my grades": true,
    students: true,
    courses: true,
    teachers: true,
    "course category": true,
    enrollments: true,
    "my calendar": true,
  });

  const [loginRole, setLoginRole] = useState("");

  useEffect(() => {
    const fetchRole = async () => {

      const { data: session, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching session:", error.message);
        return;
      }
      console.log(session.user.id);
      if (session.user.id) {
        // 2. Fetch the role using the user ID
        const role = await getUserByID(session.user.id);
        if (role) {
          console.log(role.Roles)
          const rol = role.Roles;
          setLoginRole(rol);
          console.log(loginRole)
        }
      }
    };

    fetchRole();
    console.log(loginRole)
  }, []);

  /*async function fetchRole() {
    const { data: session, error } = await supabase.auth.getUser();
    if (error) {
      console.error("Error fetching session:", error.message);
      return;
    }
    console.log(session.user);
    if(session.user){
      const data = await getUserByID(session.user.id);
      console.log(data)
      if(data)
      {
        return data.Roles;
      }
    }
  }*/

  const filteredMenuItems = menuItems.filter((menuObj) => {
    console.log(loginRole)
    if (loginRole === "Admin") {
      return (
        !(menuObj.title === "My Grades") && !(menuObj.title === "My Courses")
      );
    } else if (loginRole === "Advisor") {
      return (
        menuObj.title === "Dashboard" ||
        menuObj.title === "Students" ||
        menuObj.title === "Courses" ||
        menuObj.title === "Teachers" ||
        menuObj.title === "Course Category" ||
        menuObj.title === "Enrollments"
      );
    } else if (loginRole === "Teacher") {
      return (
        menuObj.title === "Dashboard" ||
        menuObj.title === "My Courses" ||
        menuObj.title === "My Calendar"
      );
    } else if (loginRole === "Student") {
      return (
        menuObj.title === "Dashboard" ||
        menuObj.title === "My Courses" ||
        menuObj.title === "My Grades" ||
        menuObj.title === "My Calendar"
      );
    }
    return false;
  });

  const searchMenuItems = filteredMenuItems
    .flatMap((item) => item.children)
    .filter((e) => !e.index);

  function toggleMenu(menuName) {
    setOpenMenus((prevState) => ({
      ...prevState,
      [menuName]: !prevState[menuName],
    }));
  }

  return (
    <>
      <div className={styles.sidebar}>
        <Link to="/dashboard" className={styles.logoLink}>
          <div className={styles.logoContainer}>
            <img src={logo} alt="logo" className={styles.logoImage} />
          </div>
        </Link>

        {/* Search bar in the sidebar */}
        <Search searchMenuItems={searchMenuItems} colorType="dark" menuSearch />

        <div className={styles.menu}>
          {filteredMenuItems.map((item) => (
            <div key={item.title}>
              <div
                className={styles.menuTitle}
                onClick={() => toggleMenu(item.title.toLowerCase())}
              >
                <div className={styles.menuText}>
                  {item.icon()}
                  {item.title}
                </div>
                {openMenus[item.title.toLowerCase()]
                  ? icons.MinusIcon()
                  : icons.PlusIcon()}
              </div>
              <div
                className={`${styles.menuContent} ${
                  openMenus[item.title.toLowerCase()] ? styles.open : ""
                }`}
              >
                {item.children
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
                        {icons.CircleIcon(styles.icon)}
                        {subItem.title}
                      </div>
                    </NavLink>
                  ))}
              </div>
            </div>
          ))}
        </div>
        <Link to="/" className={styles.logout}>
          {icons.LogoutIcon}
          <span>Logout</span>
        </Link>
      </div>
    </>
  );
}

export default SidebarNew;
