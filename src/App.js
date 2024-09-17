import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddStudent from "./components/Student/AddStudent";
import StudentList from "./components/Student/StudentList";
import StudentConfirmed from "./components/Student/StudentConfirm";
import StudentProfile from "./components/Student/StudentProfile";
import Overview from "./components/Overview";
import Report from "./components/Report";
import CourseList from "./components/Course/CourseList";
import NewCourse from "./components/Course/NewCourse";
import CourseEdit from "./components/Course/CourseEdit";
import CourseConfirm from "./components/Course/CourseConfirm";
import CommonPage from "./pages/CommonPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="dashboard" element={<CommonPage />}>
          <Route index element={<Overview />} />
          <Route path="overview" element={<Overview />} />
          <Route path="report" element={<Report />} />
        </Route>
        <Route path="student" element={<CommonPage />}>
          <Route index element={<StudentList />} />
          <Route path="student-list" element={<StudentList />} />
          <Route path=":studentNo" element={<StudentProfile />} />
          <Route path="add-student" element={<AddStudent />} />
          <Route
            path="confirmed/:studentNo"
            element={<StudentConfirmed type="new" />}
          />
          <Route
            path="confirmed/:studentNo"
            element={<StudentConfirmed type="edit" />}
          />
        </Route>

        <Route path="course" element={<CommonPage />}>
          <Route index element={<CourseList />} />
          <Route path="course-list" element={<CourseList />} />
          <Route path="add-course" element={<NewCourse />} />
          <Route path="course-edit/:courseId" element={<CourseEdit />} />
          <Route
            path="edit-confirmed/:branchNo"
            element={<CourseConfirm type="edit" />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
