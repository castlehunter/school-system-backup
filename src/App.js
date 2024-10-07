import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Login from "./features/Login/Login.js";
import ResetPassword from "./features/Dashboard/ResetPassword.js";
import StudentList from "./features/Student/StudentList";
import StudentConfirmed from "./features/Student/StudentConfirm";
import ViewTeacher from "./features/Teacher/ViewTeacher.js";
import Overview from "./features/Dashboard/Overview";
import MyAccount from "./features/Dashboard/MyAccount";
import CourseList from "./features/Course/CourseList";
import NewCourse from "./features/Course/NewCourse";
import CourseEdit from "./features/Course/CourseEdit";
import CourseConfirm from "./features/Course/CourseConfirm";
import AppLayout from "./ui/Layout/AppLayout.js";
import MyCourses from "./features/MyCourses/MyCourses";
import TeacherList from "./features/Teacher/TeacherList.js";
import NewEnrollment from "./features/Enrollment/NewEnrollment.js";
import Error from "./ui/Error.js";
import NOTFOUND from "./ui/NOTFOUND.js";
import { getStudents } from "./services/apiStudent.js";
import { getTeachers } from "./services/apiTeacher.js";
import { getTeacherByNo } from "./services/apiTeacher.js";
import { generateUserNo } from "./services/apiUser.js";
import NewUser from "./features/Users/NewUser.js";
import { getProgramList } from "./services/apiProgram.js";
import { getUsers } from "./services/apiUser.js";
import ProgramList from "./features/Program/ProgramList.js";
import ViewProgram from "./features/Program/ViewProgram.js";
import UserList from "./features/Users/UserList.js";
import ViewUser from "./features/Users/ViewUser.js";
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
import EnrollmentList from "./features/Enrollment/EnrollmentList.js";

const icons = {
  PlusIcon: <RiAddLine />,
  MinusIcon: <RiSubtractLine />,
  CircleIcon: <RiCircleLine />,
  DashboardIcon: <RiDashboardLine />,
  MyCoursesIcon: <RiCalendarTodoLine />,
  StudentIcon: <RiGraduationCapLine />,
  CourseIcon: <RiBookReadLine />,
  ProgramIcon: <RiBookReadLine />,
  TeacherIcon: (
    // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    //   <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    // </svg>
    <RiUserLine />
  ),
  EnrollmentIcon: (
    // <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    //   <path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2zm-1 17.93C7.06 18.69 4 15.36 4 12c0-.47.05-.92.13-1.37L9 15v1c0 1.1.9 2 2 2v1.93zM12 4c1.83 0 3.54.67 4.88 1.76L5.76 16.88C4.67 15.54 4 13.83 4 12c0-4.42 3.58-8 8-8zm1 12h-1v-4h1v4zm0-6h-1V7h1v3z" />
    // </svg>
    <RiDraftLine />
  ),
};

const routes = [
  {
    path: "/",
    element: <Login />,
    title: "Home",
  },

  {
    element: <AppLayout />,
    errorElement: <Error />,
    loader: () => {
      return routes;
    },
    children: [
      {
        path: "dashboard",
        element: <Outlet />,
        title: "Dashboard",
        icon: icons.DashboardIcon,
        children: [
          { index: true, element: <Overview />, title: "Overview" },
          {
            path: "/dashboard/overview",
            element: <Overview />,
            title: "Overview",
          },
          {
            path: "/dashboard/my-account",
            element: <MyAccount />,
            title: "My Account",
          },
          {
            path: "/dashboard/reset-password",
            element: <ResetPassword />,
            title: "Reset Password",
            hideInSidebar: true,
          },
        ],
      },
      {
        path: "my-courses",
        element: <MyCourses />,
        title: "My Courses",
        icon: icons.MyCoursesIcon,
        children: [
          { index: true, element: <MyCourses />, title: "My Courses" },
          {
            path: "my-courses",
            element: <MyCourses />,
            title: "My Courses",
          },
        ],
      },
      {
        path: "user",
        element: <Outlet />,
        title: "Users",
        icon: icons.DashboardIcon,
        children: [
          { index: true, element: <UserList />, title: "User List" },
          {
            path: "/user/user-list",
            element: <UserList />,
            loader: getUsers,
            title: "User List",
          },
          {
            path: "/user/new-user",
            element: <NewUser />,
            title: "New User",
          },
          {
            path: "/user/:userNo",
            element: <ViewUser />,
            title: "View User",
            hideInSidebar: true,
          },
        ],
      },

      {
        path: "student",
        element: <Outlet />,
        title: "Students",
        icon: icons.StudentIcon,
        children: [
          {
            index: true,
            element: <StudentList />,
            loader: getStudents,
            title: "Student List",
          },
          {
            path: "/student/student-list",
            element: <StudentList />,
            loader: getStudents,
            title: "Student List",
          },
        ],
      },

      {
        path: "course",
        element: <Outlet />,
        title: "Courses",
        icon: icons.CourseIcon,
        children: [
          { index: true, element: <CourseList />, title: "Course List" },
          {
            path: "/course/course-list",
            element: <CourseList />,
            title: "Course List",
          },
          {
            path: "/course/new-course",
            element: <NewCourse />,
            title: "New Course",
          },
        ],
      },
      {
        path: "teacher",
        element: <Outlet />,
        title: "Teachers",
        icon: icons.TeacherIcon,
        children: [
          {
            index: true,
            element: <TeacherList />,
            loader: getTeachers,
            title: "Teacher List",
          },
          {
            path: "/teacher/teacher-list",
            element: <TeacherList />,
            loader: getTeachers,
            title: "Teacher List",
          },
          {
            path: "/teacher/:userNo",
            element: <ViewTeacher />,
            title: "View Teacher",
            hideInSidebar: true,
          },
        ],
      },
      {
        path: "program",
        element: <Outlet />,
        title: "Programs",
        icon: icons.ProgramIcon,
        children: [
          {
            index: true,
            element: <ProgramList />,
            loader: getProgramList,
            title: "Program List",
          },
          {
            path: "/program/program-list",
            element: <ProgramList />,
            loader: getProgramList,
            title: "Program List",
          },
          {
            path: "/program/:programId",
            element: <ViewProgram />,
            title: "View Program",
            hideInSidebar: true,
          },
        ],
      },
      {
        path: "enrollment",
        element: <Outlet />,
        title: "Enrollments",
        icon: icons.ProgramIcon,
        children: [
          {
            index: true,
            element: <EnrollmentList />,
            //loader: getProgramList,
            title: "Enrollment List",
          },
          {
            path: "/enrollment/enrollment-list",
            element: <EnrollmentList />,
            //loader: getProgramList,
            title: "Enrollment List",
          },
          {
            path: "/enrollment/new-enrollment",
            element: <NewEnrollment />,
            //loader: getProgramList,
            title: "New Enrollment",
          },
        ],
      },
      {
        path: "*",
        element: <NOTFOUND />,
        title: "Not Found",
        icon: "ErrorIcon",
      },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
