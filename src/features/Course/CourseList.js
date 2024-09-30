import React, { useState, useEffect } from "react";
import TableContainer from "../../ui/Layout/TableContainer";
import CourseTable from "./CourseTable";
import { getCourse, getCourses } from "../../services/apiCourse";
function CourseList() {
  const [courseData, setCourseData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currPage, setCurrPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const totalPages = Math.ceil(courseData.length / rowsPerPage);

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true);
      try {
        const data = await getCourses();  
        setCourseData(data);
      } catch (error) {
        setError("Failed to fetch courses.");
        console.error("Error fetching courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);


  function handlePageChange(page) {
    setCurrPage(page);
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  function handleRowsPerPageChange(event) {
    setRowsPerPage(Number(event.target.value));
    setCurrPage(1);
  }

  return (
    <TableContainer
      title="All Courses"
      rowsPerPage={rowsPerPage}
      totalPages={totalPages}
      currPage={currPage}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
    >
      <CourseTable
        data={courseData}
        rowsPerPage={rowsPerPage}
        currPage={currPage}
        isLoading={isLoading}
      />
    </TableContainer>
  );
}

export default CourseList;
