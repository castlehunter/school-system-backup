import React from "react";
import { useState, useEffect } from "react";
import styles from "./Overview.module.css";
import StatCard from "../../components/StatCard/StatCard";
import icons from "../../ui/Icons/icons";
import { getStudents } from "../../services/apiStudent";
import { getTeachers } from "../../services/apiTeacher";
import { getCourses } from "../../services/apiCourse";
import { getEnrollments } from "../../services/apiEnrollment";
import EditContainer from "../../ui/Layout/EditContainer";
import MainTitle from "../../ui/MainTitle/MainTitle";
import { getTeacherCoursesByUserID } from "../../services/apiTeacher";
import { getStudentCoursesByUserID } from "../../services/apiStudent";
import ContactForm from "../../components/Form/ContactForm";
import { getAnnouncements } from "../../services/apiAnnouncements";
import ModalContainer from "../../ui/Layout/ModalContainer";

function Overview() {
  const [loginRole, setLoginRole] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [studentCount, setStudentCount] = useState(0);
  const [teacherCount, setTeacherCount] = useState(0);
  const [courseCount, setCourseCount] = useState(0);
  const [enrollmentCount, setEnrollmentCount] = useState(0);
  const [teacherCourses, setTeacherCourses] = useState([]);
  const [studentCourses, setStudentCourses] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [openedAnnouncement, setOpenedAnnouncement] = useState(null);
  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const storedFirstName = localStorage.getItem("firstName");
    const storedLastName = localStorage.getItem("lastName");
    setLoginRole(storedRole);
    setFirstName(storedFirstName);
    setLastName(storedLastName);
  }, []);

  useEffect(() => {
    async function fetchCounts() {
      try {
        const [students, teachers, courses, enrollments] = await Promise.all([
          getStudents(),
          getTeachers(),
          getCourses(),
          getEnrollments(),
        ]);

        setStudentCount(students.length);
        setTeacherCount(teachers.length);
        setCourseCount(courses.length);
        setEnrollmentCount(enrollments.length);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
    fetchCounts();
  }, []);

  useEffect(() => {
    async function fetchTeacherCourses() {
      const storedUserID = localStorage.getItem("UserID");
      const storedRole = localStorage.getItem("role");
      if (storedRole === "Teacher") {
        const teachercourses = await getTeacherCoursesByUserID(storedUserID);
        setTeacherCourses(teachercourses);
      } else if (storedRole === "Student") {
        const studentcourses = await getStudentCoursesByUserID(storedUserID);
        setStudentCourses(studentcourses);
      }
    }
    fetchTeacherCourses();
  }, []);

  function renderStatCards() {
    if (loginRole === "Admin" || loginRole === "Advisor") {
      return (
        <>
          <StatCard
            number={studentCount}
            unit="Students"
            icon={icons.StudentIcon(styles.largeIcon)}
            bgcolor="bgcolor1"
            link="/students"
          />
          <StatCard
            number={teacherCount}
            unit="Teachers"
            icon={icons.TeacherIcon(styles.largeIcon)}
            bgcolor="bgcolor2"
            link="/teachers"
          />
          <StatCard
            number={courseCount}
            unit="Courses"
            icon={icons.CourseIcon(styles.largeIcon)}
            bgcolor="bgcolor3"
            link="/courses"
          />
          <StatCard
            number={enrollmentCount}
            unit="Enrollments"
            icon={icons.EnrollmentIcon(styles.largeIcon)}
            bgcolor="bgcolor4"
            link="/enrollments"
          />
        </>
      );
    } else if (loginRole === "Teacher") {
      return (
        <>
          <StatCard
            number={teacherCourses.length}
            unit="My Courses"
            icon={icons.StudentIcon(styles.largeIcon)}
            bgcolor="bgcolor1"
            link="/my-courses"
          />
        </>
      );
    } else {
      return (
        <StatCard
          number={studentCourses.length}
          unit="My Courses"
          icon={icons.StudentIcon(styles.largeIcon)}
          bgcolor="bgcolor1"
          link="/my-courses"
        />
      );
    }
  }

  // function renderQuickLinks() {
  //   if (loginRole === "Admin") {
  //     return (
  //       <ul>
  //         <li>
  //           <Link to="/users/new-user" className={generalStyles.link}>
  //             Add New User
  //           </Link>{" "}
  //           <li>
  //             <Link to="/courses/new-course" className={generalStyles.link}>
  //               Add New Course
  //             </Link>
  //           </li>
  //         </li>
  //       </ul>
  //     );
  //   } else if (loginRole === "Advisor") {
  //     return (
  //       <ul>
  //         <li>
  //           <Link to="/courses/new-course" className={generalStyles.link}>
  //             Add New Course
  //           </Link>
  //         </li>
  //       </ul>
  //     );
  //   } else if (loginRole === "Teacher" || loginRole === "Student") {
  //     return (
  //       <ul>
  //         <li>
  //           <Link to="/my-courses/my-courses" className={generalStyles.link}>
  //             My Courses
  //           </Link>
  //         </li>
  //         <li>
  //           <Link to="/my-calendar/my-calendar" className={generalStyles.link}>
  //             My Calendar
  //           </Link>
  //         </li>
  //       </ul>
  //     );
  //   }
  // }

  useEffect(() => {
    async function fetchAnnouncements() {
      try {
        const data = await getAnnouncements();
        setAnnouncements(data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching announcements", error);
      }
    }

    fetchAnnouncements();
  }, []);

  function handleClickAnnouncement(announcement) {
    setOpenedAnnouncement(announcement);
  }

  function renderAnnouncements() {
    return (
      <>
        <div className={styles.announcementsContainer}>
          {announcements.map((announcement) => {
            const maxLength = 250;
            return (
              <div
                key={announcement.Id}
                className={styles.announcementItem}
                onClick={() => handleClickAnnouncement(announcement)}
              >
                <h4 className={styles.announcementTitle}>
                  {announcement.Title}
                </h4>
                <p className={styles.announcementContent}>
                  {announcement.Content.length > maxLength ? (
                    <>
                      {announcement.Content.substring(0, maxLength)}...
                      &nbsp;&nbsp;
                      <span className={styles.readMore}>Read more</span>
                    </>
                  ) : (
                    announcement.Content
                  )}
                </p>

                <span className={styles.announcementDate}>
                  {new Date(announcement.CreatedAt).toLocaleDateString()}
                </span>
              </div>
            );
          })}
        </div>
      </>
    );
  }

  return (
    <>
      <MainTitle title="Overview" />
      <div className={styles.statcards}>{renderStatCards()}</div>
      <div className={styles.overviewLayout}>
        <div className={styles.mainColumn}>
          <EditContainer title="Announcements">
            {renderAnnouncements()}
          </EditContainer>
          {/* Only show Modal if there's an active announcement */}
          {openedAnnouncement && (
            <ModalContainer
              title={openedAnnouncement.Title}
              onClose={() => setOpenedAnnouncement(null)}
            >
              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  wordWrap: "break-word",
                }}
              >
                {openedAnnouncement.Content}
              </pre>
            </ModalContainer>
          )}
        </div>

        <div className={styles.secondaryColumn}>
          <ContactForm role={loginRole} />
        </div>
      </div>
    </>
  );
}

export default Overview;
