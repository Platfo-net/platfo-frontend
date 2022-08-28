import { NextPage } from "next";
import DashboardLayout from "hoc/DashboardLayout/DashboardLayout";
import ChatbotMenu from "assets/contents/chatbotMenu";
import TopMenu from "components/TopMenu/TopMenu";
import SocialBox from "../../../components/SocialBox/SocialBox";
import { useEffect, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import AccountsService from "../../../services/endpoints/AccountsService";
import ContactsService from "../../../services/endpoints/ContactsService";
import Avatar from "../../../components/Avatar/Avatar";
import {
  getFormattedDate,
  getFormattedTime,
} from "../../../helpers/dateAndTimeHelper";

const ContactsPage: NextPage = () => {
  const [contacts, setContacts] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const { t } = useTranslation("common");

  const onSelectAccount = async (item) => {
    setSelectedAccount(item);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await AccountsService.getAccounts();
        setAccounts(response.data);
        if (response.data.length > 0) {
          const responseContacts = await ContactsService.getContacts(
            null,
            response.data[0].page_id
          );
          setSelectedAccount(response.data[0])
          const newList = responseContacts.data.map((item) => ({
            ...item,
            ...item.information,
            date:
              getFormattedTime(item.last_message_at) +
              " - " +
              getFormattedDate(item.last_message_at),
          }));
          setContacts(newList);
        }
      } catch (e) {}
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (selectedAccount) {
        try {
          const responseContacts = await ContactsService.getContacts(
            null,
            selectedAccount.page_id
          );
          const newList = responseContacts.data.map((item) => ({
            ...item,
            ...item.information,
            date:
                getFormattedTime(item.last_message_at) +
                " - " +
                getFormattedDate(item.last_message_at),
          }));
          setContacts(newList);
        } catch (e) {}
      }
    })();
  }, [selectedAccount]);
  return (
    <DashboardLayout className="chatbot">
      <TopMenu items={ChatbotMenu} />

      <div className="content basis-full ">
        <div className="flex flex-nowrap">
          <div className="w-full flex flex-wrap">
            {accounts.map((item) => {
              return (
                <div className="account-list px-2 " key={item.id}>
                  <button
                    className="p-0 h-auto w-32 h-32"
                    onClick={() => onSelectAccount(item)}
                  >
                    <Avatar
                      imageUrl={item.profile_image_url}
                      className={`${
                        item.id === selectedAccount?.id
                          ? "active chatbot"
                          : "opacity-60"
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-wrap mt-5">
          {contacts?.map((item) => {
            return (
              <div className="basis-1/6" key={item.id}>
                <SocialBox
                  className="chatbot"
                  imageUrlKey="profile_image"
                  removeable={false}
                  data={item}
                  titleKey="username"
                  descriptionKey="date"
                  buttonText={t("details")}
                />
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ContactsPage;
