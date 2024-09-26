import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import StudentList from "./features/Student/StudentList";
import StudentConfirmed from "./features/Student/StudentConfirm";
import TeacherProfile from "./features/Teacher/TeacherProfile.js";
import Overview from "./features/Dashboard/Overview";
import AccountSetting from "./features/Dashboard/AccountSetting";
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
import { getTeachers } from "./services/apiTeacher.js";
import { getTeacher } from "./services/apiTeacher.js";
import { generateUserNo } from "./services/apiUser.js";
import AddTeacher, { addTeacherAction } from "./features/Teacher/AddTeacher.js";
import AddStudent from "./features/Student/AddStudent.js";
import CreateUser from "./features/Dashboard/CreateUser.js";

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
            loader: generateUserNo,
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
          { path: "add-student", element: <AddStudent /> },
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
          { index: true, element: <TeacherList />, loader: getTeachers },
          {
            path: "teacher-list",
            element: <TeacherList />,
            loader: getTeachers,
          },
          {
            path: ":teacherNo",
            element: <TeacherProfile />,
          },
          {
            path: "add-teacher",
            element: <AddTeacher />,
            loader: generateUserNo,
          },
        ],
      },
      {
        path: "Enrollment",
        element: <AddEnrollment />,
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
