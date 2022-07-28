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
      <div className="lg:basis-1/7 md:basis-1/6 sm:basis-1/3 ltr:mr-7 rtl:ml-7">
        <ConnectionSidebar />
      </div>
      <div className="grow mx-7">
        <AddNewConnectionForm />
      </div>
    </DashboardLayout>
  );
};

export default AddAccountPage;
