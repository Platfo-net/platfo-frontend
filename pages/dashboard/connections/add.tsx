import { NextPage } from "next";
import DashboardLayout from "hoc/DashboardLayout/DashboardLayout";
import { useRouter } from "next/router";
import { useCallback } from "react";
import ConnectionSidebar from "containers/dashboard/connections/ConnectionSidebar";
import useTranslation from "next-translate/useTranslation";
import AddNewConnectionForm from "containers/dashboard/connections/AddNewConnectionForm";

const AddAccountPage: NextPage = () => {
  const { t } = useTranslation("common");

  return (
    <DashboardLayout>
      <ConnectionSidebar />
      <div className="content basis-full ">
        <AddNewConnectionForm />
      </div>
    </DashboardLayout>
  );
};

export default AddAccountPage;
