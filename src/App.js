import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddStudent from "./features/Student/AddStudent";
import StudentList from "./features/Student/StudentList";
import { studentListLoader } from "./services/apiStudent";
import StudentConfirmed from "./features/Student/StudentConfirm";
import StudentProfile from "./features/Student/StudentProfile";
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
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Outlet />,
        children: [
          { index: true, element: <Overview /> },
          { path: "overview", element: <Overview /> },
          { path: "account-setting", element: <AccountSetting /> },
        ],
      },
      {
        path: "/student",
        element: <Outlet />,
        children: [
          { index: true, element: <StudentList /> },
          {
            path: "student-list",
            element: <StudentList />,
            loader: studentListLoader,
          },
          { path: "add-student", element: <AddStudent /> },
        ],
      },
      {
        path: "/my-courses",
        element: <MyCourses />,
        children: [{ path: "overview", element: <MyCourses /> }],
      },
      {
        path: "/Course",
        element: <Outlet />,
        children: [
          { index: true, element: <CourseList /> },

          { path: "course-list", element: <CourseList /> },
          { path: "add-course", element: <AddCourse /> },
        ],
      },
      {
        path: "/Teacher",
        element: <TeacherList />,
      },
      {
        path: "/Enrollment",
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
