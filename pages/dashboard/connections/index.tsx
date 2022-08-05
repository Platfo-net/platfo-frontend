import { NextPage } from "next";
import DashboardLayout from "hoc/DashboardLayout/DashboardLayout";
import TopMenu from "components/TopMenu/TopMenu";
import ConnectionMenu from "assets/contents/connectionMenu";

const ConnectionsPage: NextPage = () => {
  return (
    <DashboardLayout>
      <TopMenu items={ConnectionMenu} />
      <div className="content basis-full "></div>
    </DashboardLayout>
  );
};

export default ConnectionsPage;
