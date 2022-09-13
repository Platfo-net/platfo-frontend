import { NextPage } from "next";
import DashboardLayout from "hoc/DashboardLayout/DashboardLayout";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import { AxiosResponse } from "axios";
import SocialBox from "components/SocialBox/SocialBox";
import { useEffect, useRef, useState } from "react";
import TopMenu from "components/TopMenu/TopMenu";
import ConnectionMenu from "assets/contents/connectionMenu";
import ConnectionService from "services/endpoints/ConnectionService";
import Modal from "components/Modal/Modal";
import AddNewConnectionForm from "containers/dashboard/connections/AddNewConnectionForm";
import { useAppSelector } from "hooks/reduxHooks";
import Avatar from "components/Avatar/Avatar";
import TriggersService from "services/endpoints/TriggersService";
import ChatflowService from "services/endpoints/ChatflowService";
import { tokenObj } from "helpers/token";
import AccountsService from "../../../../services/endpoints/AccountsService";
import ContactsService from "../../../../services/endpoints/ContactsService";
import ChatbotMenu from "../../../../assets/contents/chatbotMenu";
import MessageList from "../../../../containers/dashboard/chatbot/messages/MessageList";
import ContactMessages from "../../../../containers/dashboard/chatbot/contacts/ContactMessages";

const ContactDetailsPage: NextPage = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { id } = router.query;

  const [accountInfo, setAccountInfo] = useState(null);

  const updateConnectionMenu = [
    ...ChatbotMenu,
    {
      key: "contact-info",
      path: "/dashboard/chatbot/contacts/[id]",
      type: "button",
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        getData();
      } catch (e) {}
    })();
  }, []);

  const getData = async () => {
    try {
      const responseDetail: AxiosResponse = await ContactsService.getContactDetails(
        id
      );
      setAccountInfo(responseDetail.data);

    } catch (e) {}
  };

  return (
    <DashboardLayout>
      <TopMenu items={updateConnectionMenu} />
      <div className="content basis-full ">
        {accountInfo && (
          <div className="flex flex-wrap mb-5 p-4 border-t-0 border-x-0">
            <div className=" flex">
              {/* <h3 className="mb-5 mx-5">{t("account-info")}</h3> */}
              <div className="flex mx-4 my-auto w-32 h-32">
                <Avatar imageUrl={accountInfo?.information.profile_image} />
              </div>
              <div className="flex rtl:mr-16 ltr:ml-16 my-3 flex-col">
                <span className="mt-3 text-xl">{accountInfo?.information.username}</span>
                <div className="flex mt-3">
                  {accountInfo?.information?.followers_count && (
                    <span className="ltr:mr-3 rtl:ml-3">
                      <b>{accountInfo?.information?.followers_count}</b>{" "}
                      {t("followers")}
                    </span>
                  )}
                </div>
                <div className="flex  mt-3">
                  {accountInfo?.information?.name && (
                    <span className="ltr:mr-3 rtl:ml-3">
                      <b>{accountInfo?.information?.name}.</b>{" "}
                    </span>
                  )}

                </div>
                <div className="flex  mt-3">

                <span className={`rounded-full w-3 h-3 mt-1 ${accountInfo?.information?.is_verified_user ? "bg-green-300" : 'bg-red-400'}`}/>
                  <span className="rlt:mr-1 rtl:ml-16 ltr:ml-1 ltr:mr-16">{t('is_verified_user')}</span>

                  <span className={`rounded-full w-3 h-3 mt-1 ${accountInfo?.information?.is_user_follow_business ? "bg-green-300" : 'bg-red-400'}`}/>
                  <span className="rlt:mr-1 rtl:ml-16 ltr:ml-1 ltr:mr-16">{t('is_user_follow_business')}</span>

                  <span className={`rounded-full w-3 h-3 mt-1 ${accountInfo?.information?.is_business_follow_user ? "bg-green-300" : 'bg-red-400'}`}/>
                  <span className="rlt:mr-1 rtl:ml-16 ltr:ml-1 ltr:mr-16">{t('is_business_follow_user')}</span>
                </div>
              </div>
            </div>

          </div>
        )}
        <ContactMessages userData={accountInfo} />
      </div>


    </DashboardLayout>
  );
};

export default ContactDetailsPage;
