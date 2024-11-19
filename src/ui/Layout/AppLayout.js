import Breadcrumb from "../Breadcrumb/Breadcrumb";
import Layout from "./Layout";
import { Outlet } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

function AppLayout() {
  const { userNo } = useUser();
  return (
    <Layout breadcrumb={<Breadcrumb />} userNo={userNo}>
      <div>
        <Outlet />
      </div>
    </Layout>
  );
}

export default AppLayout;
