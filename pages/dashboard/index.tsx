import { NextPage } from "next";
import DashboardLayout from "hoc/DashboardLayout/DashboardLayout";
import { useRouter } from "next/router";
import { useCallback } from "react";

const Dashboard: NextPage = () => {
  return (
    <DashboardLayout>
      <div> hi</div>
    </DashboardLayout>
  );
};

export default Dashboard;
