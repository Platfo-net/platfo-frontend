import { NextPage } from "next";
import DashboardLayout from "hoc/DashboardLayout/DashboardLayout";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import { AxiosResponse } from "axios";
import SocialBox from "components/SocialBox/SocialBox";
import { useEffect, useState } from "react";
import TopMenu from "components/TopMenu/TopMenu";
import ConnectionMenu from "assets/contents/connectionMenu";
import ConnectionService from "services/endpoints/ConnectionService";
import Modal from "components/Modal/Modal";
import AddNewConnectionForm from "containers/dashboard/connections/AddNewConnectionForm";
import { useAppSelector } from "hooks/reduxHooks";
import Avatar from "components/Avatar/Avatar";
import TriggersService from "services/endpoints/TriggersService";

const AccountDetailsPage: NextPage = () => {
  const { accountList } = useAppSelector((state) => ({
    accountList: state.connections.accountList,
  }));
  const { t } = useTranslation("common");
  const router = useRouter();
  const { id } = router.query;

  const [accountInfo, setAccountInfo] = useState(null);
  const [connections, setConections] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [triggerOptions, setTriggerOptions] = useState([]);

  useEffect(() => {
    if (accountList.length > 0) {
      const info = accountList.find((item) => item.id === id);
      setAccountInfo(info);
    } else {
      router.push("/dashboard/connections/accounts");
    }

    (async () => {
      try {
        const params = {
          account_id: id,
        };
        const response: AxiosResponse = await ConnectionService.getConnections(
          params
        );
        setConections(response.data);
      } catch (e) {}
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (openModal) {
          const response: AxiosResponse = await TriggersService.getAllTriggers(
            null
          );
          setTriggerOptions(response.data);
        }
      } catch (e) {}
    })();
  }, [openModal]);

  const modalHandler = () => setOpenModal(!openModal);

  const onSubmit = () => {};

  return (
    <DashboardLayout>
      <TopMenu items={ConnectionMenu} />
      <div className="content basis-full ">
        {accountInfo && (
          <div className="flex-col mb-5">
            <h3 className="mb-5 mx-5">{t("account-info")}</h3>
            <div className="flex mx-4 mb-5">
              <Avatar imageUrl={accountInfo.profile_image_url} />
              <span className="my-auto mx-5">{accountInfo.username}</span>
            </div>
          </div>
        )}
        <div className="flex mt-5">
          <h3 className="block m-5">{t("connections")}</h3>
        </div>

        <div className="flex flex-wrap">
          <SocialBox
            empty
            onClick={modalHandler}
            title={t("add-new-connection")}
          />
          {connections?.map((item) => {
            return (
              <div className="basis-1/6" key={item.id}>
                <SocialBox
                  data={item}
                  imageUrlKey="profile_image_url"
                  titleKey="username"
                  buttonText={t("details")}
                  onClick={() => {}}
                />
              </div>
            );
          })}
        </div>
      </div>
      <Modal
        open={openModal}
        onCancel={modalHandler}
        title={t("add-new-connection")}
        size="lg"
        onSubmit={onSubmit}
      >
        <AddNewConnectionForm triggerOptions={triggerOptions} />
      </Modal>
    </DashboardLayout>
  );
};

export default AccountDetailsPage;
