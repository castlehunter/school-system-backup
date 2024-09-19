import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddStudent from "./components/Student/AddStudent";
import StudentList from "./components/Student/StudentList";
import StudentConfirmed from "./components/Student/StudentConfirm";
import StudentProfile from "./components/Student/StudentProfile";
import Overview from "./components/Overview";
import AccountSetting from "./components/AccountSetting";
import CourseList from "./components/Course/CourseList";
import NewCourse from "./components/Course/NewCourse";
import CourseEdit from "./components/Course/CourseEdit";
import CourseConfirm from "./components/Course/CourseConfirm";
import CommonPage from "./pages/CommonPage";
import ProgramList from "./components/Program/ProgramList";
import MyCourses from "./components/MyCourses/MyCourses";

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
      },
      {
        path: "student-list",
        element: <StudentList />,
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
  {
    path: "program",
    element: <CommonPage />,
    children: [
      {
        index: true,
        element: <ProgramList />,
      },
      {
        path: "program-list",
        element: <ProgramList />,
      },
    ],
  },
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
        element: <NewCourse />,
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
