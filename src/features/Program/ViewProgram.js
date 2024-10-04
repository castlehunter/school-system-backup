import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ProgramTable from "./ProgramTable.js";
import TableContainer from "../../ui/Layout/TableContainer";
import { getProgramById } from "../../services/apiProgram.js";
import Container from "../../ui/Layout/Container";
import styles from "../Profile.module.css";

function ViewProgram() {
  const { programId } = useParams();
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currPage, setCurrPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        setError("");
        const teacherData = await getProgramById(programId);
        setData(teacherData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [programId]);

  function handleRowsPerPageChange(event) {
    setRowsPerPage(Number(event.target.value));
    setCurrPage(1); // Reset to first page when rows per page changes
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div class="generalStyles_container__DHmXN" style={{width:50 + 'em'}}>
      <div className={styles.secondaryColumn}>
      <Container title="Program" headingType="secondaryHeading">
      <div class="Form_formRow__-UmKe"> 
        <div class="Form_formItem__hJaw7">
          <label for="userNo" class="Form_formLabel__vziVJ">Program Name</label>
          <input type="text" id="ProgramName" name="ProgramName" class="Form_formInput__+EqoL" readonly="" disabled="" value={data.ProgramName}/>
        </div>     
        </div>
        <div class="Form_formItem__hJaw7">
          <label for="userNo" class="Form_formLabel__vziVJ">Program Code</label>
          <input type="text" id="ProgramName" name="ProgramName" class="Form_formInput__+EqoL" readonly="" disabled="" value={data.ProgramCode}/>
        </div>
        <div> 
          <button class="Button_btn__JwD5A Button_small__+07mn" style={{marginRight:25 + 'px'}}>Update</button>
          <button class="Button_btn__JwD5A Button_small__+07mn">Cancel</button>
        </div>
      </Container>{" "}
      </div>
    </div>
  
  );
}

export default ViewProgram;
