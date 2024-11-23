import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import generalStyles from "../../generalStyles.module.css";
import styles from "./MyCourse.module.css";
import course1 from "../../assets/course-STEM.jpg";
import instructor1 from "../../assets/instructor.jpg";
import CourseCard from "../../components/CourseCard/CourseCard";
import TableContainer from "../../ui/Layout/TableContainer";
import MainTitle from "../../ui/MainTitle/MainTitle";
import { getTeacherCoursesByUserID } from "../../services/apiTeacher";
import { getStudentCoursesByUserID } from "../../services/apiStudent";
import { getUserByID } from "../../services/apiUser";
import { getTeacherFullNameByCourseID } from "../../services/apiCourse";
import Loader from "../../ui/Loader";
import { getCourseDetail } from "../../services/apiCourse";

function CourseDetails() {
  const [currPage, setCurrPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [myCourses, setMyCourses] = useState([]);
  const { courseNo } = useParams();
  const [course, setCourse] = useState(null);
  const [originalCourse, setOriginalCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCourseDetails() {
      try {
        setIsLoading(true);
        setError(null);
        const courseData = await getCourseDetail({ params: { ID: courseNo } });
        console.log("Fetched course data:", courseData);
        setCourse(courseData);
        setOriginalCourse(courseData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCourseDetails();
  }, [courseNo]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading course details: {error}</p>;

  const totalPages = Math.ceil(myCourses.length / rowsPerPage);

  function handlePageChange(page) {
    setCurrPage(page);
  }

  function handleRowsPerPageChange(event) {
    setRowsPerPage(Number(event.target.value));
    setCurrPage(1);
  }

  const currmyCourses = myCourses.slice(
    (currPage - 1) * rowsPerPage,
    currPage * rowsPerPage
  );

  return (
    <>
      <MainTitle title="Course Details" />
      <TableContainer
        rowsPerPage={rowsPerPage}
        totalPages={totalPages}
        currPage={currPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <h2>{course.CourseName}</h2>
            <p>Course Number: {courseNo}</p>

            {/* <h3>Learning Materials</h3>
            {course.learningMaterials && course.learningMaterials.length > 0 ? (
              <ul>
                {course.learningMaterials.map((material) => (
                  <li key={material.id}>
                    <a href={material.url} target="_blank" rel="noopener noreferrer">{material.title}</a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No learning materials available.</p>
            )} */}

            <h3>Learning Videos</h3>
            {course.learningVideos && course.learningVideos.length > 0 ? (
              <ul>
                {course.learningVideos.map((video) => (
                  <li key={video.id}>
                    <a href={video.url} target="_blank" rel="noopener noreferrer">{video.title}</a>
                  </li>
                ))}
              </ul>
            ) : (
                <iframe width="560" height="315" src="https://www.youtube.com/embed/3tisOnOkwzo?si=p1SVYB5r9sI7i4-t" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            )}

            <h3>Grades</h3>
            {course.grades && course.grades.length > 0 ? (
              <ul>
                {course.grades.map((grade) => (
                  <li key={grade.id}>{grade.studentName}: {grade.score}</li>
                ))}
              </ul>
            ) : (
              <p>No grades available.</p>
            )}
          </>
        )}
      </TableContainer>
    </>
  );
}

export default CourseDetails;
