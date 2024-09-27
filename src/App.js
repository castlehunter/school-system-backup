import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import StudentList from "./features/Student/StudentList";
import StudentConfirmed from "./features/Student/StudentConfirm";
import TeacherProfile from "./features/Teacher/TeacherProfile.js";
import Overview from "./features/Dashboard/Overview";
import MyAccount from "./features/Dashboard/MyAccount";
import CourseList from "./features/Course/CourseList";
import AddCourse from "./features/Course/AddCourse";
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

import CreateUser from "./features/Dashboard/CreateUser.js";
import { getProgramList } from "./services/apiProgram.js";
import { getProgram } from "./services/apiProgram.js";
import ProgramList from "./features/Program/ProgramList.js";
import ViewProgram from "./features/Program/ViewProgram.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "dashboard",
        element: <Outlet />,
        children: [
          { index: true, element: <Overview /> },
          { path: "overview", element: <Overview /> },
          {
            path: "create-user",
            element: <CreateUser />,
          },
          { path: "account-setting", element: <AccountSetting /> },
        ],
      },
      {
        path: "student",
        element: <Outlet />,
        children: [
          { index: true, element: <StudentList />, loader: getStudents },
          {
            path: "student-list",
            element: <StudentList />,
            loader: getStudents,
          },
        ],
      },
      {
        path: "my-courses",
        element: <MyCourses />,
        children: [{ path: "overview", element: <MyCourses /> }],
      },
      {
        path: "Course",
        element: <Outlet />,
        children: [
          { index: true, element: <CourseList /> },

          { path: "course-list", element: <CourseList /> },
          { path: "add-course", element: <AddCourse /> },
        ],
      },
      {
        path: "teacher",
        element: <Outlet />,
        children: [
          { index: true, element: <TeacherList />, loader: getTeacherByIds },
          {
            path: "teacher-list",
            element: <TeacherList />,
            loader: getTeacherByIds,
          },
          {
            path: ":teacherId",
            element: <TeacherProfile />,
          },
        ],
      },
      {
        path: "program",
        element: <Outlet />,
        children: [
          {
            path: "program-list",
            element: <ProgramList />,
            loader: getProgramList,
          },
          {
            path: ":ID",
            element: <ViewProgram type="Program" />,
            loader: getProgram,
          },
        ],
      },
      {
        path: "*",
        element: <NOTFOUND />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
