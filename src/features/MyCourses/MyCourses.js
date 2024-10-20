// import generalStyles from "../../generalStyles.module.css";
import { useState } from "react";
import styles from "./MyCourse.module.css";
import course1 from "../../assets/course-STEM.jpg";
import instructor1 from "../../assets/instructor.jpg";
import CourseCard from "../../components/CourseCard/CourseCard";
import TableContainer from "../../ui/Layout/TableContainer";

// Test data that will be replaced with real courses data
const courseItems = [
  {
    id: 123456,
    title: "Grade 7 Math ",
    image: course1,
    instructorName: "Adam Brown",
    instructorAvtar: instructor1,
    classRoom: "B-1007",
    classTime: "9:00-11:30 am",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 223456,
    title: "Grade 7 Math ",
    image: course1,
    instructorName: "Adam Brown",
    instructorAvtar: instructor1,
    classRoom: "B-1007",
    classTime: "9:00-11:30 am",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 323456,
    title: "Grade 7 Math ",
    image: course1,
    instructorName: "Adam Brown",
    instructorAvtar: instructor1,
    classRoom: "B-1007",
    classTime: "9:00-11:30 am",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 423456,
    title: "Grade 7 Math ",
    image: course1,
    instructorName: "Adam Brown",
    instructorAvtar: instructor1,
    classRoom: "B-1007",
    classTime: "9:00-11:30 am",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 523456,
    title: "Grade 7 Math ",
    image: course1,
    instructorName: "Adam Brown",
    instructorAvtar: instructor1,
    classRoom: "B-1007",
    classTime: "9:00-11:30 am",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 623456,
    title: "Grade 7 Math ",
    image: course1,
    instructorName: "Adam Brown",
    instructorAvtar: instructor1,
    classRoom: "B-1007",
    classTime: "9:00-11:30 am",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 723456,
    title: "Grade 7 Math ",
    image: course1,
    instructorName: "Adam Brown",
    instructorAvtar: instructor1,
    classRoom: "B-1007",
    classTime: "9:00-11:30 am",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 823456,
    title: "Grade 7 Math ",
    image: course1,
    instructorName: "Adam Brown",
    instructorAvtar: instructor1,
    classRoom: "B-1007",
    classTime: "9:00-11:30 am",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 923456,
    title: "Grade 7 Math ",
    image: course1,
    instructorName: "Adam Brown",
    instructorAvtar: instructor1,
    classRoom: "B-1007",
    classTime: "9:00-11:30 am",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 1023456,
    title: "Grade 7 Math ",
    image: course1,
    instructorName: "Adam Brown",
    instructorAvtar: instructor1,
    classRoom: "B-1007",
    classTime: "9:00-11:30 am",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

function MyCourses() {
  const [currPage, setCurrPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const totalPages = Math.ceil(courseItems.length / rowsPerPage);
  const itemsNums = [4, 8, 12, 16];
  if (!courseItems || courseItems.length === 0) {
    return <p>No users found.</p>;
  }

  function handlePageChange(page) {
    setCurrPage(page);
  }

  function handleRowsPerPageChange(event) {
    setRowsPerPage(Number(event.target.value));
    setCurrPage(1);
  }

  const currCourseItems = courseItems.slice(
    (currPage - 1) * rowsPerPage,
    currPage * rowsPerPage
  );

  return (
    <>
      <h1>My Courses</h1>
      <TableContainer
        title="Current Courses"
        rowsPerPage={rowsPerPage}
        totalPages={totalPages}
        currPage={currPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        itemsNums={itemsNums}
      >
        <div className={styles["course-grid"]}>
          {currCourseItems.map((item) => (
            <CourseCard
              key={item.id}
              title={item.title}
              image={item.image}
              instructorName={item.instructorName}
              instructorAvtar={item.instructorAvtar}
              classRoom={item.classRoom}
              classTime={item.classTime}
              description={item.description}
            />
          ))}
        </div>
      </TableContainer>
    </>
    // <div className={generalStyles.container}>
    //   {/* <div>For teachers:</div>
    //   <div>
    //     My Courses:
    //     <p>1. Computer 1 ---student list in this course.</p>;
    //     <p>2. Computer 2 ---student list in this course.</p>
    //     <div>For students:</div>
    //     <div>
    //       My Courses:
    //       <p>1. Maths</p>;<p>2. History</p>
    //     </div>
    //   </div>
    //   <hr /> */}

    //   <div className={generalStyles.containerHeading}>My Courses</div>

    //   <div className={styles.searchSection}>
    //     <Search searchItems={courseItems} colorType="light" />

    //     <select>
    //       <option value="">Select a term</option>
    //       <option value="summer">Summer Term</option>
    //       <option value="winter">Winter Term</option>
    //       <option value="fall">Fall Term</option>
    //     </select>

    //     <div>
    //       <label>Courses per page</label>
    //       <select>
    //         <option value="4">4</option>
    //         <option value="8">8</option>
    //         <option value="12">12</option>
    //       </select>
    //     </div>
    //   </div>

    //   <div className={styles["course-grid"]}>
    //     {courseItems.map((item) => (
    //       <CourseCard
    //         key={item.id}
    //         title={item.title}
    //         image={item.image}
    //         instructorName={item.instructorName}
    //         instructorAvtar={item.instructorAvtar}
    //         classRoom={item.classRoom}
    //         classTime={item.classTime}
    //         description={item.description}
    //       />
    //     ))}
    //   </div>
    // </div>
  );
}

export default MyCourses;
