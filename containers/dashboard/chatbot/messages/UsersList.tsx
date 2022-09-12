import HorizontalUserBox from "components/HorizontalUserBox/HorizontalUserBox";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { useEffect, useState } from "react";
import ContactsService from "services/endpoints/ContactsService";
import { selectUser } from "stores/actions";
type UsersListProps = {};

const UsersList: React.FC<UsersListProps> = () => {
  const { selectedAccount, selectedUser } = useAppSelector((state) => ({
    selectedAccount: state.message.selectedAccount,
    selectedUser: state.message.selectedUser,
  }));
  const [users, setUsers] = useState([]);
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
          if (response.data.length > 0) {
            dispatch(selectUser(response.data[0]));
          }
          setUsers(response.data);
        } catch (e) {}
      }
    })();
  }, [selectedAccount]);

  return (
    <>
      {users.length > 0 && (
        <div className="flex flex-col card user-list overflow-y-auto ">
          <div className="items flex flex-col ">
            {users.map((item) => {
              return (
                <HorizontalUserBox
                  key={item.id}
                  item={item}
                  onClick={onClick}
                  information={true}
                  active={selectedUser?.id === item.id}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default UsersList;
