import { NextPage } from "next";
import DashboardLayout from "hoc/DashboardLayout/DashboardLayout";
import { useRouter } from "next/router";
import { useCallback } from "react";
import Connectionbar from "containers/dashboard/connections/Connectionbar";
import useTranslation from "next-translate/useTranslation";
import AddNewConnectionForm from "containers/dashboard/connections/AddNewConnectionForm";

const AddAccountPage: NextPage = () => {
  const { t } = useTranslation("common");

  return (
    <DashboardLayout>
      <Connectionbar />
      <div className="content basis-full ">
        <AddNewConnectionForm />
      </div>
    </DashboardLayout>
  );
};

export default AddAccountPage;
