import Breadcrumb from "../Breadcrumb/Breadcrumb";
import Layout from "./Layout";
import { Outlet } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

function AppLayout() {
  const { user } = useUser(); // get login user data
  return (
    <Layout breadcrumb={<Breadcrumb />} user={user}>
      <div>
        <Outlet />
      </div>
    </Layout>
  );
}

export default AppLayout;
