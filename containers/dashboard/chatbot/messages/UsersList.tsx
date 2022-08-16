import HorizontalUserBox from "components/HorizontalUserBox/HorizontalUserBox";
import Input from "components/Input/Input";
import { useAppSelector } from "hooks/reduxHooks";
import useTranslation from "next-translate/useTranslation";
import { useEffect } from "react";
import ContactsService from "services/endpoints/ContactsService";
import Img from "../../../../assets/img/p.png";
type UsersListProps = {};

const UsersList: React.FC<UsersListProps> = () => {
  const { selectedAccount } = useAppSelector((state) => ({
    selectedAccount: state.message.selectedAccount,
  }));
  let { t } = useTranslation("common");

  useEffect(() => {
    (async () => {
      if (selectedAccount) {
        try {
          const response = await ContactsService.getContacts(
            null,
            selectedAccount.page_id
          );
        } catch (e) {}
      }
    })();
  }, [selectedAccount]);

  return (
    <div className="flex flex-col user-list">
      <Input placeholder={t("search")} />
      <div className="items flex flex-col overflow-y-auto px-2">
        <HorizontalUserBox
          imageUrl={Img}
          title="User name"
          subTitle="hello, sir"
        />
        <HorizontalUserBox
          imageUrl={Img}
          title="User name"
          subTitle="hello, sir"
        />
        <HorizontalUserBox
          imageUrl={Img}
          title="User name"
          subTitle="hello, sir"
        />
        <HorizontalUserBox
          imageUrl={Img}
          title="User name"
          subTitle="hello, sir"
        />
        <HorizontalUserBox
          imageUrl={Img}
          title="User name"
          subTitle="hello, sir"
        />{" "}
        <HorizontalUserBox
          imageUrl={Img}
          title="User name"
          subTitle="hello, sir"
        />
        <HorizontalUserBox
          imageUrl={Img}
          title="User name"
          subTitle="hello, sir"
        />
        <HorizontalUserBox
          imageUrl={Img}
          title="User name"
          subTitle="hello, sir"
        />
        <HorizontalUserBox
          imageUrl={Img}
          title="User name"
          subTitle="hello, sir"
        />
      </div>
    </div>
  );
};

export default UsersList;
