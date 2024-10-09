import generalStyles from "../../generalStyles.module.css";
import styles from "./MyCourse.module.css";
import course1 from "../../assets/course-STEM.jpg";
import instructor1 from "../../assets/instructor.jpg";
import CourseCard from "../../components/CourseCard/CourseCard";
import { NavigatorLockAcquireTimeoutError } from "@supabase/supabase-js";

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
];

function MyCourses() {
  return (
    <div className={generalStyles.container}>
      <div>For teachers:</div>
      <div>
        My Courses:
        <p>1. Computer 1 ---student list in this course.</p>;
        <p>2. Computer 2 ---student list in this course.</p>
        <div>For students:</div>
        <div>
          My Courses:
          <p>1. Maths</p>;<p>2. History</p>
        </div>
      </div>
      <hr />

      <div className={styles.header}>My Course</div>

      <div className={styles.searchSection}>
        <input type="search"></input>

        <select>
          <option value="">Select a term</option>
          <option value="summer">Summer Term</option>
          <option value="winter">Winter Term</option>
          <option value="fall">Fall Term</option>
        </select>

        <div>
          <label>Courses per page</label>
          <select>
            <option value="4">4</option>
            <option value="8">8</option>
            <option value="12">12</option>
          </select>
        </div>
      </div>

      <div className={styles["course-grid"]}>
        {courseItems.map((item) => (
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
    </div>
  );
}

export default MyCourses;
