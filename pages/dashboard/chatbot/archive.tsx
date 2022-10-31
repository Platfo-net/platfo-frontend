import { NextPageWithLayout } from '@/types/next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { chatbotMenu } from '@/constants/dashboardMenu';
import { useEffect } from 'react';
import { useAppDispatch } from '@/stores/reduxHooks';
import { getAccounts } from '@/stores/reducers/chatbot';
import AccountsAvatars from '@/components/pages/AccountsAvatars';

const ChatbotPage: NextPageWithLayout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAccounts());
  }, [dispatch]);

  return (
    <>
      <div className="flex flex-nowrap">
        <div className="w-3/12 mx-2 ">{/*<UserInfo />*/}</div>
        <div className="w-6/12 mx-2 ">
          <AccountsAvatars />
          {/*<MessageList />*/}
        </div>
        <div className="w-3/12 mx-2 ">{/*<UsersList />*/}</div>
      </div>
    </>
  );
};

export default ChatbotPage;

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

ChatbotPage.getLayout = (page) => {
  return (
    <DashboardLayout
      topMenu={chatbotMenu}
      meta={{ title: 'Archive' }}
      color="chatbot"
    >
      {page}
    </DashboardLayout>
  );
};
