import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Layout from "./Layout";
import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <Layout breadcrumb={<Breadcrumb />}>
      <div>
        <Outlet />
      </div>
    </Layout>
  );
}

export default AppLayout;
