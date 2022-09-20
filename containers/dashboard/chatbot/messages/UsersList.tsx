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

  const onRefresh = async() => {
    await getUsers();

  }

  const getUsers = async () => {
    if (selectedAccount) {
      try {
        const response = await ContactsService.getContacts(
            null,
            selectedAccount.page_id
        );
        if (response.data.length > 0) {
          dispatch(selectUser(response.data[0]));
        }
        else {
          dispatch(selectUser(null))
        }
        setUsers(response.data);
      } catch (e) {}
    }
  }

  useEffect(() => {
    (async () => {
      await getUsers();
    })();
  }, [selectedAccount]);

  return (
      <div className="flex flex-col card user-list overflow-y-auto ">
      <button className="primary" onClick={onRefresh}>Refresh</button>
      {users.length > 0 ? (
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
      ) : (

            <span className="m-auto text-gray-400">No User </span>
      )}
    </div>
  );
};

export default UsersList;
