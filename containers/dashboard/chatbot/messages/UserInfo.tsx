import Avatar from "components/Avatar/Avatar";
import { useAppSelector } from "hooks/reduxHooks";
import { useEffect, useState } from "react";
import ContactsService from "services/endpoints/ContactsService";
import MessagesService from "services/endpoints/MessagesService";
import Img from "../../../../assets/img/p.png";

type UserInfoProps = {};

const UserInfo: React.FC<UserInfoProps> = () => {
  const { selectedUser, selectedAccount } = useAppSelector((state) => ({
    selectedUser: state.message.selectedUser,
    selectedAccount: state.message.selectedAccount,
  }));
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      if (selectedUser) {
        try {
          const response = await ContactsService.getContactDetails(
            null,
            selectedUser.id
          );
          setData(response.data);
        } catch (e) {}
      }
    })();
  }, [selectedUser]);

  useEffect(() => {
    (async () => {
      if (selectedAccount) {
        setData(null);
      }
    })();
  }, [selectedAccount]);

  return (
    <>
      {data && (
        <div className={`user-info card h-full flex flex-col`}>
          <div className="w-3/4 mx-auto flex justify-center">
            <Avatar
              imageUrl={data.information.profile_image}
              className="mx-auto"
            />
          </div>
          <div className="w-Full text-center">
            <h3> {data.information.username} </h3>
          </div>
        </div>
      )}
    </>
  );
};

export default UserInfo;
