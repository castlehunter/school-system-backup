import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../Button";
import Loader from "../Loader";

function ClientConfirm({ type }) {
  const [clientData, setClientData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { clientNo } = useParams();

  useEffect(() => {
    if (!clientNo) {
      return;
    }

    async function fetchClientData() {
      try {
        setIsLoading(true);
        setError("");
        const response = await fetch(
          `http://localhost:3900/api/client/${clientNo}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch client data");
        }
        const data = await response.json();

        const clientArray = data[0];

        const transformedData = {
          clientNo: clientArray[0],
          fname: clientArray[1],
          lname: clientArray[2],
          telno: clientArray[3],
          street: clientArray[4],
          city: clientArray[5],
          email: clientArray[6],
          preftype: clientArray[7],
          maxrent: clientArray[8],
        };
        setClientData(transformedData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchClientData();
  }, [clientNo]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!clientData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {type === "new" && <h1>Client Added</h1>}
          {type === "edit" && <h1>Client Updated</h1>}
          <div>
            <p>First Name: {clientData.fname}</p>
            <p>Last Name: {clientData.lname}</p>
            <p>Telephone: {clientData.telno}</p>
            <p>Street: {clientData.street}</p>
            <p>City: {clientData.city}</p>
            <p>Email: {clientData.email}</p>
            <p>Preferred Type: {clientData.preftype}</p>
            <p>Max Rent: {clientData.maxrent}</p>
          </div>
          <Button onClick={() => navigate("/dashboard/client/client-list")}>
            Go to Client List
          </Button>
        </>
      )}
    </>
  );
}

export default ClientConfirm;
