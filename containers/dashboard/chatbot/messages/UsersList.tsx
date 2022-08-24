import HorizontalUserBox from "components/HorizontalUserBox/HorizontalUserBox";
import Input from "components/Input/Input";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useState } from "react";
import ContactsService from "services/endpoints/ContactsService";
import MessagesService from "services/endpoints/MessagesService";
import { selectUser } from "stores/actions";
import Img from "../../../../assets/img/p.png";
type UsersListProps = {};

const UsersList: React.FC<UsersListProps> = () => {
  const { selectedAccount, selectedUser } = useAppSelector((state) => ({
    selectedAccount: state.message.selectedAccount,
    selectedUser: state.message.selectedUser,
  }));
  const [users, setUsers] = useState([]);
  let { t } = useTranslation("common");
  const dispatch = useAppDispatch();

  const onClick = async (item) => {
    dispatch(selectUser(item));
  };

  useEffect(() => {
    (async () => {
      if (selectedAccount) {
        try {
          const response = await ContactsService.getContacts(
            null,
            selectedAccount.page_id
          );
          setUsers(response.data);
        } catch (e) {}
      }
    })();
  }, [selectedAccount]);

  return (
    <div className="flex flex-col user-list">
      {users.length > 0 && (
        <>
          <Input placeholder={t("search")} />
          <div className="items flex flex-col overflow-y-auto px-2">
            {users.map((item) => {
              return (
                <HorizontalUserBox
                  key={item.id}
                  item={item}
                  onClick={onClick}
                  information={true}
                  className={selectedUser?.id === item.id ? "active" : ""}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default UsersList;
