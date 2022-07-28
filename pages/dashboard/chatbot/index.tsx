import { NextPage } from "next";
import DashboardLayout from "hoc/DashboardLayout/DashboardLayout";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { AuthState } from "stores/reducers/authReducer";
import { useSelector } from "react-redux";

const ChatbotPage: NextPage = () => {
  const { language } = useSelector((state: AuthState) => ({
    language: state.auth.language,
  }));
  const router = useRouter();
  const { locale } = router;

  return (
    <DashboardLayout>
      <div> hi</div>
    </DashboardLayout>
  );
};

export default ChatbotPage;
