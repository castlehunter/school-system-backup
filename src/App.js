import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
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
import AddEnrollment from "./features/Enrollment/AddEnrollment.js";
import Error from "./ui/Error.js";
import NOTFOUND from "./ui/NOTFOUND.js";
import { getStudents } from "./services/apiStudent.js";
import { getTeacherByIds } from "./services/apiTeacher.js";
import { getTeacherById } from "./services/apiTeacher.js";
import { generateUserNo } from "./services/apiUser.js";

import NewUser from "./features/Dashboard/NewUser.js";
import { getProgramList } from "./services/apiProgram.js";
import { getProgram } from "./services/apiProgram.js";
import ProgramList from "./features/Program/ProgramList.js";
import ViewProgram from "./features/Program/ViewProgram.js";
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
    element: <HomePage />,
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
          { path: "my-account", element: <MyAccount /> },
        ],
      },

      {
        path: "my-courses",
        element: <MyCourses />,
        title: "My Courses",
        icon: icons.MyCoursesIcon,
        children: [
          { index: true, element: <MyCourses />, title: "My Courses" },
          { path: "my-courses", element: <MyCourses />, title: "My Courses" },
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
        path: "Course",
        element: <Outlet />,
        title: "Courses",
        icon: icons.CourseIcon,
        children: [
          { index: true, element: <CourseList />, title: "Course List" },
          {
            path: "course-list",
            element: <CourseList />,
            title: "Course List",
          },
          { path: "new-course", element: <NewCourse />, title: "New Course" },
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
            loader: getTeacherByIds,
            title: "Teacher List",
          },
          {
            path: "/teacher/teacher-list",
            element: <TeacherList />,
            loader: getTeacherByIds,
            title: "Teacher List",
          },
          {
            path: "/teacher/:teacherId",
            element: <ViewTeacher />,
            title: "View Teacher",
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
            path: "program/program-list",
            element: <ProgramList />,
            loader: getProgramList,
            title: "Program List",
          },
          {
            path: "program/:ID",
            element: <ViewProgram type="Program" />,
            loader: getProgram,
            title: "View Program",
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
