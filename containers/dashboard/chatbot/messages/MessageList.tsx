import Avatar from "components/Avatar/Avatar";
import MessageBox from "components/MessageBox/MessageBox";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import MessagesService from "services/endpoints/MessagesService";
import { getAccounts, selectAccount } from "stores/actions";

type MessageListProps = {};

const MessageList: React.FC<MessageListProps> = () => {
  const { accountList, selectedAccount, selectedUser } = useAppSelector(
    (state) => ({
      accountList: state.connections.accountList,
      selectedAccount: state.message.selectedAccount,
      selectedUser: state.message.selectedUser,
    })
  );
  const dispatch = useAppDispatch();
  const { t } = useTranslation("common");
  const [messages, setMessages] = useState([]);

  const onSelectAccount = (item) => {
    dispatch(selectAccount(item));
  };

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getAccounts());
      } catch (e) {}
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (selectedAccount) {
        setMessages([]);
      }
    })();
  }, [selectedAccount]);

  useEffect(() => {
    (async () => {
      if (selectedUser) {
        try {
          const response = await MessagesService.getArchive(
            null,
            selectedUser.user_page_id,
            selectedUser.contact_igs_id
          );
          setMessages(response.data);
        } catch (e) {}
      }
    })();
  }, [selectedUser]);

  return (
    <div className="flex flex-col h-full">
      {accountList.length > 0 && <h3 className="mx-2 mt-0">{t("accounts")}</h3>}

      <div className="w-full flex flex-wrap">
        {accountList.map((item) => {
          return (
            <div className="account-list px-2 " key={item.id}>
              <button
                className="p-0 h-auto"
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
      {messages.length > 0 && (
        <div className="w-full flex flex-col card h-full mt-2 overflow-y-auto">
          {messages?.map((item) => {
            return (
              <MessageBox
                key={item.id}
                className={`${
                  selectedUser.user_page_id === item.from_page_id
                    ? "bot"
                    : "user"
                }  w-1/2`}
                data={item}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MessageList;
