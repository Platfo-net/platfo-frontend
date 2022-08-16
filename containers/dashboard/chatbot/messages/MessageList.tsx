import Avatar from "components/Avatar/Avatar";
import MessageBox from "components/MessageBox/MessageBox";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import useTranslation from "next-translate/useTranslation";
import { useEffect } from "react";
import { getAccounts, selectAccount } from "stores/actions";
import Img from "../../../../assets/img/p.png";

type MessageListProps = {};

const MessageList: React.FC<MessageListProps> = () => {
  const { accountList, selectedAccount } = useAppSelector((state) => ({
    accountList: state.connections.accountList,
    selectedAccount: state.message.selectedAccount,
  }));
  const dispatch = useAppDispatch();
  const { t } = useTranslation("common");

  useEffect(() => {
    (async () => {
      try {
        await dispatch(getAccounts());
      } catch (e) {}
    })();
  }, []);

  const onSelectAccount = (item) => {
    dispatch(selectAccount(item));
  };
  console.log(selectedAccount);

  return (
    <div className="flex flex-col h-full">
      <h3 className="mx-2 mt-0">{t("accounts")}</h3>
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
      <div className="w-full flex flex-col card h-full mt-2">
        <MessageBox className="user w-1/2" text="سلام خوبی؟" />
        <MessageBox className="bot w-1/2" text="ممنون" />
      </div>
    </div>
  );
};

export default MessageList;
