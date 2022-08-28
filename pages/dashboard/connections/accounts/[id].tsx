import { NextPage } from "next";
import DashboardLayout from "hoc/DashboardLayout/DashboardLayout";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import { AxiosResponse } from "axios";
import SocialBox from "components/SocialBox/SocialBox";
import { useEffect, useRef, useState } from "react";
import TopMenu from "components/TopMenu/TopMenu";
import ConnectionMenu from "assets/contents/connectionMenu";
import ConnectionService from "services/endpoints/ConnectionService";
import Modal from "components/Modal/Modal";
import AddNewConnectionForm from "containers/dashboard/connections/AddNewConnectionForm";
import { useAppSelector } from "hooks/reduxHooks";
import Avatar from "components/Avatar/Avatar";
import TriggersService from "services/endpoints/TriggersService";
import ChatflowService from "services/endpoints/ChatflowService";
import { tokenObj } from "helpers/token";

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
  const [chatflowOptions, setChatflowOptions] = useState([]);
  const [record, setRecord] = useState(null);
  const submitRef = useRef();

  const updateConnectionMenu = [
    ...ConnectionMenu,
    {
      key: "account-info",
      path: "/dashboard/connections/accounts/[id]",
      type: "button",
    },
  ];

  useEffect(() => {
    if (accountList.length > 0) {
      const info = accountList.find((item) => item.id === id);
      setAccountInfo(info);
    } else {
      router.push("/dashboard/connections/accounts");
    }

    (async () => {
      try {
        getData();
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
          const token = tokenObj.getAccessToken();
          const headers = {
            token: `Bearer ${token}`,
          };
          const responseFlow: AxiosResponse =
            await ChatflowService.getUserChatflows(null, headers);
          setChatflowOptions(responseFlow.data);
        }
      } catch (e) {}
    })();
  }, [openModal]);

  const getData = async () => {
    try {
      const params = {
        account_id: id,
      };
      const response: AxiosResponse = await ConnectionService.getConnections(
        params
      );
      setConections(response.data);
    } catch (e) {}
  };
  const modalHandler = () => {
    setOpenModal(!openModal);
    if (openModal) {
      setRecord(null);
    }
  };
  const modalHandlerDetails = () => setOpenModalDetails(!openModalDetails);

  const onSubmit = () => {
    submitRef.current.click();
  };

  const onSuccess = async () => {
    modalHandler();
    getData();
  };

  const onEdit = (item) => {
    setRecord(item);
    modalHandler();
  };

  const onDisconnect = async (item) => {
    try {
      await ConnectionService.deleteConnection(item.id);
      getData();
      // Todo: notification
    } catch (e) {}
  };

  return (
    <DashboardLayout>
      <TopMenu items={updateConnectionMenu} />
      <div className="content basis-full ">
        {accountInfo && (
          <div className="flex flex-wrap mb-5">
            <div className="basis-1/2 ">
              {/* <h3 className="mb-5 mx-5">{t("account-info")}</h3> */}
              <div className="flex mx-4 my-auto w-52" >
                <Avatar imageUrl={accountInfo.profile_image_url} />
                <b className="my-auto mx-5">{accountInfo.username}</b>
              </div>
            </div>
            <div className="basis-1/2 flex">
              {/*TODO <button
                className="primary my-auto rtl:mr-auto"
                onClick={onDisconnect}
              >
                {t("disconnect")}
              </button> */}
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
                  removeable={true}
                  data={item}
                  imageUrlKey="profile_image_url"
                  titleKey="name"
                  descriptionKey="description"
                  buttonText={t("edit")}
                  onClick={onEdit}
                  iconKey={item.application_name}
                  onClickRemove={onDisconnect}
                />
              </div>
            );
          })}
        </div>
      </div>
      <Modal
        open={openModal}
        onCancel={modalHandler}
        title={record ? t("edit-connection") : t("add-new-connection")}
        size="lg"
        onSubmit={onSubmit}
      >
        <AddNewConnectionForm
          triggerOptions={triggerOptions}
          chatflowOptions={chatflowOptions}
          submitRef={submitRef}
          account_id={id}
          onSuccess={onSuccess}
          record={record}
          status={openModal}
        />
      </Modal>
    </DashboardLayout>
  );
};

export default AccountDetailsPage;
