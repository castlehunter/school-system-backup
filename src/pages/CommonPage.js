import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import Layout from "../ui/Layout/Layout";
import { Outlet } from "react-router-dom";

function CommonPage() {
  return (
    <Layout breadcrumb={<Breadcrumb />}>
      <div>
        <Outlet />
      </div>
    </Layout>
  );
}

export default CommonPage;
