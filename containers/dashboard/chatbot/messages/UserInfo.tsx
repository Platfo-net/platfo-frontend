import Avatar from "components/Avatar/Avatar";
import { useAppSelector } from "hooks/reduxHooks";
import { useEffect, useState } from "react";
import ContactsService from "services/endpoints/ContactsService";
import useTranslation from "next-translate/useTranslation";

type UserInfoProps = {};

const UserInfo: React.FC<UserInfoProps> = () => {
  const {t} = useTranslation("common")
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
      {data?.information && (
        <div className={`user-info card flex flex-col `}>
          <div className="w-1/2  mx-auto flex justify-center">
            <Avatar
              imageUrl={data.information.profile_image}

            />
          </div>
          <div className="w-Full text-center">
            <h3> {data.information.username} </h3>
          </div>
          <div className="w-Full flex flex-col rtl:text-right ltr:text-left">

            <span >  <b> {data.information.name} </b></span>
            <span className="mt-2">
              <b> {data.information.followers_count} </b> {t("followers")}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default UserInfo;
