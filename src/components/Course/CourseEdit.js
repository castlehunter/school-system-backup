import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styles from "../Student/StudentProfile.module.css";
import Button from "../Button/Button";

function CourseEdit() {
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");

  const [error, setError] = useState(null);

  const { branchNo } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCourseData() {
      try {
        const response = await fetch(
          `http://localhost:3900/api/branch/${branchNo}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch the branch data");
        }
        const branchData = await response.json();

        const transformedData = branchData.map((branch) => ({
          branchNo: branch[0],
          street: branch[1],
          city: branch[2],
          postcode: branch[3],
        }));

        if (transformedData.length === 0) {
          throw new Error("No branch data found");
        }
        const { street, city, postcode } = transformedData[0];

        setStreet(street);
        setCity(city);
        setPostcode(postcode);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchCourseData();
  }, [branchNo]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!street || !city || !postcode) {
      alert("Fields cannot be blank!");
      return;
    }

    const updatedBranch = {
      branchNo,
      street,
      city,
      postcode,
    };

    try {
      const response = await fetch(
        `http://localhost:3900/api/branch/${branchNo}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedBranch),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update branch");
      }

      navigate(`/dashboard/branch/edit-confirmed/${branchNo}`);
    } catch (error) {
      setError(error.message);
    }
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  function handleCancel(e) {
    e.preventDefault();
    navigate(-1);
  }

  return (
    <div className={styles.staffFormContainer}>
      <main className={styles.mainContent}>
        <section className={styles.formWrapper}>
          <h2 className={styles.formTitle}>Staff Editing</h2>

          <form className={styles.staffForm} onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="branchNo" className={styles.formLabel}>
                  Branch No.
                </label>
                <input
                  type="text"
                  className={styles.formInput}
                  value={branchNo}
                  disabled="true"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="street" className={styles.formLabel}>
                  Street
                </label>
                <input
                  type="text"
                  className={styles.formInput}
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="city" className={styles.formLabel}>
                  City
                </label>
                <input
                  type="text"
                  value={city}
                  className={styles.formInput}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="city" className={styles.formLabel}>
                  Postal Code
                </label>
                <input
                  type="text"
                  value={postcode}
                  className={styles.formInput}
                  onChange={(e) => setPostcode(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.formActions}>
              <Button classType="submit">Edit</Button>
              <Button classType="cancel" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </form>
          {error && <div>Error: {error}</div>}
        </section>
      </main>
    </div>
  );
}

export default CourseEdit;
