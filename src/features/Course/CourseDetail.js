// import { useNavigate, useParams } from "react-router-dom";
// import React, { useEffect, useState } from "react";
// import styles from "../Profile.module.css";
// import formStyles from "../../components/Form/Form.module.css";
// import Loader from "../../ui/Loader";
// import EditContainer from "../../ui/Layout/EditContainer";
// import ProfileForm from "../../components/Form/ProfileForm";
// import OtherForm from "../../components/Form/OtherForm";

// function CourseDetail() {
//   const [basicInfo, setBasicInfo] = useState({
//     studentNo: "",
//     firstName: "",
//     lastName: "",
//     dob: "",
//     sex: "",
//     telephone: "",
//     mobile: "",
//     email: "",
//     address: "",
//   });
//   const [course, setCourse] = useState([]);
//   const [isEditBasic, setIsEditBasic] = useState(false);
//   const [isEditProgram, setIsEditProgram] = useState(false);
//   const [isEditCourse, setIsEditCourse] = useState(false);
//   const [isEditAdditional, setIsEditAdditional] = useState(false);

//   const { studentNo: urlStudentNo } = useParams();
//   const navigate = useNavigate();

//   function handleChange(e) {
//     const { name, value } = e.target;

//     setBasicInfo((prevInfo) => ({
//       ...prevInfo,
//       [name]: value,
//     }));
//   }

//   function isValidPhoneNumber(number) {
//     return /^[0-9]+$/.test(number);
//   }

//   function isValidEmail(email) {
//     return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
//   }

//   async function handleSubmitBasic(e) {
//     e.preventDefault();

//     const { telephone, mobile, email } = basicInfo;

//     if (!telephone || !email) {
//       alert("Fields cannot be blank!");
//       return;
//     }

//     if (!isValidPhoneNumber(telephone) || !isValidPhoneNumber(mobile)) {
//       alert("Telephone and mobile must contain only numbers");
//       return;
//     }

//     if (!isValidEmail(email)) {
//       alert("Email should be in the format of xxx@xxx.xxx");
//       return;
//     }

//     try {
//       const response = await fetch(
//         `http://localhost:3900/api/student/${basicInfo.studentNo}`,
//         {
//           method: "PUT",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(basicInfo),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to update student");
//       }

//       setIsEditBasic(false);
//       navigate(`/dashboard/staff/edit-confirmed/${basicInfo.studentNo}`);
//     } catch (error) {
//       setError(error.message);
//     }
//   }

//   async function handleSubmitCourse(e) {}

//   async function handleSubmitAdditional(e) {}

//   function handleEditBasic() {
//     setIsEditBasic((prev) => !prev);
//   }

//   function handleEditCourse() {
//     setIsEditCourse((prev) => !prev);
//   }

//   function handleEditAdditional() {
//     setIsEditAdditional((prev) => !prev);
//   }

//   function handleCancelEditBasic() {
//     setIsEditBasic(false);
//   }

//   function handleCancelCourse() {
//     setIsEditCourse(false);
//   }

//   function handleCancelAdditional() {
//     setIsEditAdditional(false);
//   }

//   return (
//     <div className={styles.ProfileLayout}>
//       <div className={styles.basicInfo}>
//         <EditContainer
//           title="Basic Information"
//           isEdit={isEditBasic}
//           onClickEdit={handleEditBasic}
//           onClickConfirm={handleSubmitBasic}
//           onClickCancel={handleCancelEditBasic}
//         >
//           <div className={styles.detail}>
//             <img
//               src="/img/profile/profile.jpg"
//               alt="img"
//               className={styles.profileImg}
//             />
//             <form className={styles.form} onSubmit={handleSubmitBasic}>
//               <ProfileForm
//                 formData={basicInfo}
//                 handleChange={handleChange}
//                 isEdit={isEditBasic}
//                 formWidth={formStyles.formFull}
//               />
//             </form>
//           </div>
//         </EditContainer>
//       </div>

//       <div className={styles.course}>
//         <EditContainer
//           title="Courses Enrolled"
//           isEdit={isEditProgram}
//           onClickEdit={isEditCourse ? handleSubmitCourse : handleEditCourse}
//           onClickCancel={handleCancelCourse}
//         >
//           <div>
//             <form className={styles.form} onSubmit={handleSubmitCourse}>
//               <OtherForm
//                 formArr={course}
//                 handleChange={handleChange}
//                 isEdit={isEditProgram}
//               />
//             </form>
//           </div>
//         </EditContainer>
//       </div>

//       <EditContainer
//         title="Additional Information"
//         isEdit={isEditAdditional}
//         onClickEdit={
//           isEditAdditional ? handleSubmitAdditional : handleEditAdditional
//         }
//         onClickCancel={handleCancelAdditional}
//       >
//         <div className={styles.detail}>
//           <form className={styles.form} onSubmit={handleSubmitAdditional}>
//             {/* 在这里添加附加信息的表单组件 */}
//           </form>
//         </div>
//       </EditContainer>
//     </div>
//   );
// }

//export default CourseDetail;

// import { useNavigate, useParams } from "react-router-dom";
// import React, { useEffect, useState } from "react";
// import styles from "../Profile.module.css";
// import formStyles from "../../components/Form/Form.module.css";
// import Loader from "../../ui/Loader";
// import EditContainer from "../../ui/Layout/EditContainer";
// //import OtherForm from "../OtherForm";


// function CourseDetail() {
//   const { courseID } = useParams();
//   const [course, setCourse] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Check if courseID is valid
//     if (!courseID) {
//       console.error("Course ID is undefined!");
//       return; // Early return if courseID is undefined
//     }

//     async function fetchCourseDetails() {
//       try {
//         const response = await fetch(`http://localhost:3900/api/course/${courseID}`);
//         const data = await response.json();
//         setCourse(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Failed to fetch course details", error);
//         setLoading(false);
//       }
//     }

//     fetchCourseDetails();
//   }, [courseID]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>Course Details</h2>
//       {course && <div>{course.CourseName}</div>}
//     </div>
//   );
// }

// export default CourseDetail;

import Container from "../../ui/Layout/Container";
import generalStyles from "../../generalStyles.module.css";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import React, { useEffect, useState } from "react";
import styles from "../Profile.module.css"; // Ensure this path is correct
import Loader from "../../ui/Loader"; // Ensure this path is correct
import EditContainer from "../../ui/Layout/EditContainer"; // Ensure this path is correct
import { getCourseDetail, deleteCourse, updateCourse } from "../../services/apiCourse"; // Import your API function
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import EditCourseForm from "../../components/Form/EditCourseForm";
function CourseDetail() {
  const { courseID } = useParams(); 
  const navigate = useNavigate(); 
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State to manage edit mode

  useEffect(() => {
    async function fetchCourseDetails() {
      try {
        setIsLoading(true);
        setError(null);
        const courseData = await getCourseDetail({ params: { ID: courseID } });
        setCourse(courseData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCourseDetails();
  }, [courseID]);

  const handleDeleteCourse = async () => {
    try {
      await deleteCourse(courseID); 
      alert("Course deleted successfully!");
      navigate("/course/course-list"); 
    } catch (err) {
      alert("Failed to delete the course: " + err.message);
    }
  };
  const handleBack = async () => {
    try {
      navigate("/course/course-list"); 
    } catch (err) {
      alert("Failed to go back " + err.message); // Handle errors
    }
  };


  const handleCancelEdit = () => {
    setIsEditing(false); // Exit editing mode without saving changes
  };

  const handleEditCourse = async (updatedCourse) => {
    try {
      await updateCourse(courseID, updatedCourse); // Update course details
      alert("Course updated successfully!"); // Confirmation message
      setIsEditing(false); // Exit edit mode
      // Optionally, fetch updated course details again to refresh UI
      const courseData = await getCourseDetail({ params: { ID: courseID } });
      setCourse(courseData);
    } catch (err) {
      alert("Failed to update course: " + err.message); // Handle errors
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.ProfileLayout}>
      <div className={styles.basicInfo}>
        <h2>Course Details</h2>
        {course ? (
          <div>
            {isEditing ? (
              <EditCourseForm course={course} onSubmit={handleEditCourse}  onCancel={handleCancelEdit}/> // Render edit form if in editing mode
            ) : (
              <div>
                <p>Course ID: {course.CourseID}</p>
                <p>Course Name: {course.CourseName}</p>
                <p>Description: {course.Description}</p>
                <p>Program Name: {course.Programs.ProgramName}</p>
                <p>Program Code: {course.Programs.ProgramCode}</p>
                <p>Teacher Name: {course.TeacherUser.FirstName} {course.TeacherUser.LastName}</p>
                <p>Teacher Email: {course.TeacherUser.Email}</p>
                <Button onClickBtn={() => setIsEditing(true)}>Edit Course</Button> {/* Set edit mode */}
                <Button onClickBtn={handleDeleteCourse}>Delete Course</Button>
                <Button onClickBtn={handleBack}>Back</Button>

              </div>
            )}
          </div>
        ) : (
          <p>No course data found.</p>
        )}
      </div>
    </div>
  );
}

export default CourseDetail;