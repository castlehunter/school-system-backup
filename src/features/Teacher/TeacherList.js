import React, { useState, useEffect } from "react";
import TableContainer from "../../ui/Layout/TableContainer";
import { useLoaderData } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

  const supabaseUrl = "https://llcccnztkkxlkzblokbt.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsY2Njbnp0a2t4bGt6Ymxva2J0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYxNzQ2OTgsImV4cCI6MjA0MTc1MDY5OH0.Fgq-wx04VugAegPGuiBjd25h1SmZMqThXU_4H5qjGTw";
const supabase = createClient(supabaseUrl, supabaseKey);


function TeacherList() {

const [teachers, setTeachers] = useState([]);


useEffect(() => {
  getTeachers();
}, []);

async function getTeachers() {
  const { data, error } = await supabase
  .from('Teachers')
  .select(`
    *,
    Users (
      UserID,
      UserName,
      FirstName,
      LastName,
      Email,
      HomeAddress,
      DateOfBirth,
      PhoneNumber
    )
  `);

if (error) {
  console.error(error);
} else {
  console.log(data);
}
  setTeachers(data);
}

return (
  <ul>
    {teachers.map((teacher) => (
      <li key={teacher.TeacherID}>
        <h3>{teacher.Users.FirstName} {teacher.Users.LastName}</h3>
        <p>Email: {teacher.Users.Email}</p>
        <p>Phone: {teacher.Users.PhoneNumber}</p>
        <p>Address: {teacher.Users.HomeAddress}</p>
        <p>Start Date: {teacher.StartDate}</p>
      </li>
    ))}
  </ul>
);


}

export default TeacherList;
