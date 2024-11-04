import EditContainer from "../../ui/Layout/EditContainer";
import formStyles from "./Form.module.css";
import generalStyles from "../../generalStyles.module.css";
import { useState, useEffect } from "react";
import { getSchoolInformation } from "../../services/apiSchool";
import { updateSchoolInformation } from "../../services/apiSchool";
import Button from "../Button/Button";

function ContactForm() {
  const [schoolData, setSchoolData] = useState({
    ContactMessage: "",
    Phone: "",
    Email: "",
    Website: "",
    Address: "",
  });
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    async function fetchSchoolInformation() {
      const schooldata = await getSchoolInformation();
      console.log("schooldata", schooldata);
      setSchoolData(schooldata);
    }
    fetchSchoolInformation();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    const updatedData = {
      ...schoolData,
      [name]: value,
    };
    setSchoolData(updatedData);
  }

  function handleClickEdit(e) {
    e.preventDefault();
    setIsOpenModal(true);
  }

  function handleClickCancel(e) {
    e.preventDefault();
    setIsOpenModal(false);
  }

  async function handleClickSave(e) {
    e.preventDefault();
    try {
      const data = await updateSchoolInformation(
        "d8d5caa0-5269-4c3c-8adc-f7590ded9eee",
        schoolData
      );
      console.log("School Data", schoolData);
      setIsOpenModal(false);

      if (data) {
        alert("School information updated successfully!");
      } else {
        alert("Failed to update school information.");
        console.error("Failed to update school information:");
      }
    } catch (error) {
      console.error("Error saving school data:", error);
      alert("An error occurred while saving the school data.");
    }
  }

  return (
    <EditContainer
      title="Contact"
      editButtonText="Edit"
      onClickEdit={handleClickEdit}
      onClickSave={handleClickSave}
      onClickCancel={handleClickCancel}
    >
      {isOpenModal && <div className={formStyles.overlay}></div>}
      {isOpenModal && (
        <div className={formStyles.modal}>
          <h1>Edit Contact Information</h1>
          <br />
          <div className={formStyles.sectionLayout}>
            <form>
              <div className={formStyles.formRow}>
                <div className={formStyles.formItem}>
                  <label
                    htmlFor="ContactMessage"
                    className={formStyles.formLabel}
                  >
                    Contact Message
                  </label>
                  <textarea
                    type="text"
                    id="ContactMessage"
                    name="ContactMessage"
                    className={formStyles.formInput}
                    value={schoolData.ContactMessage}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className={formStyles.formRow}>
                <div className={formStyles.formItem}>
                  <label htmlFor="Phone" className={formStyles.formLabel}>
                    Phone
                  </label>
                  <input
                    type="text"
                    id="Phone"
                    name="Phone"
                    className={formStyles.formInput}
                    value={schoolData.Phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className={formStyles.formRow}>
                <div className={formStyles.formItem}>
                  <label htmlFor="Phone2" className={formStyles.formLabel}>
                    IT/Technical Support
                  </label>
                  <input
                    type="text"
                    id="Phone2"
                    name="Phone2"
                    className={formStyles.formInput}
                    value={schoolData.Phone2}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className={formStyles.formRow}>
                <div className={formStyles.formItem}>
                  <label htmlFor="Email" className={formStyles.formLabel}>
                    Email
                  </label>
                  <input
                    type="text"
                    id="Email"
                    name="Email"
                    className={formStyles.formInput}
                    value={schoolData.Email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className={formStyles.formRow}>
                <div className={formStyles.formItem}>
                  <label htmlFor="Website" className={formStyles.formLabel}>
                    Website
                  </label>
                  <input
                    type="text"
                    id="Website"
                    name="Website"
                    className={formStyles.formInput}
                    value={schoolData.Website}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className={formStyles.formItem}>
                <label htmlFor="address" className={formStyles.formLabel}>
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="Address"
                  className={formStyles.formInput}
                  value={schoolData.Address}
                  onChange={handleChange}
                />
              </div>
              <div className={generalStyles.bottomButtons}>
                <Button onClickBtn={handleClickSave}>Save</Button>
                <Button onClickBtn={handleClickCancel}>Cancel</Button>
              </div>
            </form>{" "}
          </div>
        </div>
      )}
      <div className={formStyles.noData}>
        <p>{schoolData.ContactMessage}</p>
        <br />
        <p>
          <strong>General Inquiry:</strong> {schoolData.Phone}
        </p>
        <p>
          <strong>IT/Technical Support:</strong> {schoolData.Phone}
        </p>
        <p>
          <strong>Email:</strong> {schoolData.Email}
        </p>
        <p>
          <strong>Website:</strong> {schoolData.Website}
        </p>
        <p>
          <strong>Address:</strong> {schoolData.Address}
        </p>
      </div>
    </EditContainer>
  );
}

export default ContactForm;
