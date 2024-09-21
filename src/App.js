import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
import CommonPage from "./pages/CommonPage";
import MyCourses from "./features/MyCourses/MyCourses";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "dashboard",
    element: <CommonPage />,
    children: [
      {
        index: true,
        element: <Overview />,
      },
      {
        path: "overview",
        element: <Overview />,
      },
      {
        path: "account-setting",
        element: <AccountSetting />,
      },
    ],
  },
  {
    path: "my-courses",
    element: <CommonPage />,
    children: [
      {
        index: true,
        element: <MyCourses />,
      },
      {
        path: "my-course-list",
        element: <MyCourses />,
      },
    ],
  },
  {
    path: "student",
    element: <CommonPage />,
    children: [
      {
        index: true,
        element: <StudentList />,
        loader: studentListLoader,
      },
      {
        path: "student-list",
        element: <StudentList />,
        loader: studentListLoader,
      },
      {
        path: ":studentNo",
        element: <StudentProfile />,
      },
      {
        path: "add-student",
        element: <AddStudent />,
      },
      {
        path: "confirmed/:studentNo",
        element: <StudentConfirmed type="new" />,
      },
      {
        path: "confirmed/:studentNo",
        element: <StudentConfirmed type="edit" />,
      },
    ],
  },
  // {
  //   path: "program",
  //   element: <CommonPage />,
  //   children: [
  //     {
  //       index: true,
  //       element: <ProgramList />,
  //     },
  //     {
  //       path: "program-list",
  //       element: <ProgramList />,
  //     },
  //   ],
  // },
  {
    path: "course",
    element: <CommonPage />,
    children: [
      {
        index: true,
        element: <CourseList />,
      },
      {
        path: "course-list",
        element: <CourseList />,
      },
      {
        path: "add-course",
        element: <AddCourse />,
      },
      {
        path: "course-edit/:courseId",
        element: <CourseEdit />,
      },
      {
        path: "edit-confirmed/:branchNo",
        element: <CourseConfirm type="edit" />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
