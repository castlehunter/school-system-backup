import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styles from "../Form.module.css";
import Button from "../Button";

function ClientEdit() {
  const [clientNo, setClientNo] = useState(""); // Add state for clientNo
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [preftype, setPreftype] = useState("");
  const [maxRent, setMaxRent] = useState("");
  const [error, setError] = useState(null);

  const { clientNo: paramClientNo } = useParams(); // Rename to avoid confusion
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchClientData() {
      try {
        const response = await fetch(
          `http://localhost:3900/api/client/${paramClientNo}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch client data");
        }
        const clientData = await response.json();

        const transformedData = clientData.map((client) => ({
          clientNo: client[0],
          fname: client[1],
          lname: client[2],
          telno: client[3],
          street: client[4],
          city: client[5],
          email: client[6],
          preftype: client[7],
          maxrent: client[8],
        }));

        if (transformedData.length === 0) {
          throw new Error("No client data found");
        }

        const {
          clientNo,
          fname,
          lname,
          telno,
          street,
          city,
          email,
          preftype,
          maxrent,
        } = transformedData[0];

        setClientNo(clientNo); // Set clientNo state
        setFirstName(fname);
        setLastName(lname);
        setTelephone(telno);
        setStreet(street);
        setCity(city);
        setEmail(email);
        setPreftype(preftype);
        setMaxRent(maxrent);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchClientData();
  }, [paramClientNo]);

  function isValidName(name) {
    return /^[a-zA-Z]+$/.test(name);
  }

  // function isValidPhoneNumber(number) {
  //   return /^[0-9]+$/.test(number);
  // }

  function isValidEmail(email) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!telephone || !email) {
      alert("Fields cannot be blank!");
      return;
    }

    if (!isValidName(firstName) || !isValidName(lastName)) {
      alert("First name and last name should contain only letters");
      return;
    }

    // if (!isValidPhoneNumber(telephone)) {
    //   alert("Telephone must contain only numbers");
    //   return;
    // }

    if (!isValidEmail(email)) {
      alert("Email should be in the format of xxx@xxx.xxx");
      return;
    }

    const updatedClient = {
      clientNo,
      fname: firstName,
      lname: lastName,
      telno: telephone,
      email,
      street,
      city,
      preftype,
      maxrent: maxRent,
    };

    try {
      const response = await fetch(
        `http://localhost:3900/api/client/${clientNo}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedClient),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update client");
      }
    } catch (error) {
      setError(error.message);
    }

    navigate(`/dashboard/client/edit-confirmed/${clientNo}`);
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  function handleCancel(e) {
    e.preventDefault();
    navigate(-1);
  }

  return (
    <div className={styles.clientFormContainer}>
      <main className={styles.mainContent}>
        <section className={styles.formWrapper}>
          <h2 className={styles.formTitle}>Client Editing</h2>

          <form className={styles.clientForm} onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="clientNo" className={styles.formLabel}>
                  Client No.
                </label>
                <input
                  type="text"
                  className={styles.formInput}
                  value={clientNo}
                  disabled
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="firstName" className={styles.formLabel}>
                  First Name
                </label>
                <input
                  type="text"
                  className={styles.formInput}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="lastName" className={styles.formLabel}>
                  Last Name
                </label>
                <input
                  type="text"
                  className={styles.formInput}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="telephone" className={styles.formLabel}>
                  Telephone
                </label>
                <input
                  type="text"
                  className={styles.formInput}
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
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
                  className={styles.formInput}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.formLabel}>
                  Email
                </label>
                <input
                  type="text"
                  className={styles.formInput}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="prefType" className={styles.formLabel}>
                  Preferred Type
                </label>
                <input
                  type="text"
                  className={styles.formInput}
                  value={preftype}
                  onChange={(e) => setPreftype(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="maxRent" className={styles.formLabel}>
                  Max Rent
                </label>
                <input
                  type="number"
                  className={styles.formInput}
                  value={maxRent}
                  onChange={(e) => setMaxRent(e.target.value)}
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

export default ClientEdit;
