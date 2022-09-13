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

            <span className="text-center">  <b> {data.information.name} </b></span>
            <span className="mt-2 text-center">
              <b> {data.information.followers_count} </b> {t("followers")}
            </span>
            <div className="flex  mt-5">
              <span className={`rounded-full w-3 h-3 mt-1 ${data?.information?.is_verified_user ? "bg-green-300" : 'bg-red-400'}`}/>
              <span className="rlt:mr-1  ltr:ml-1">{t('is_verified_user')}</span>
            </div>
            <div className="flex  mt-3">
              <span className={`rounded-full w-3 h-3 mt-1 ${data?.information?.is_user_follow_business ? "bg-green-300" : 'bg-red-400'}`}/>
              <span className="rlt:mr-1 ltr:ml-1">{t('is_user_follow_business')}</span>
            </div>
            <div className="flex  mt-3">
              <span className={`rounded-full w-3 h-3 mt-1 ${data?.information?.is_business_follow_user ? "bg-green-300" : 'bg-red-400'}`}/>
              <span className="rlt:mr-1 ltr:ml-1">{t('is_business_follow_user')}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserInfo;
