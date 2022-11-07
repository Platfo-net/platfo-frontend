import { useRouter } from 'next/router';
import { AxiosResponse } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { accountsMenu } from '@/constants/dashboardMenu';
import { NextPageWithLayout } from '@/types/next';
import { Application, Path } from '@/constants/enums';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import InfoSection from '@/components/dataDisplay/InfoSection/InfoSection';
import AccountService from '@/services/endpoints/AccountService';
import { Res_Account_Id, Res_Connection_All } from '@/types/api';
import ConnectionService from '@/services/endpoints/ConnectionService';
import { Avatar } from '@/components/dataDisplay/Avatar';
import { useTranslation } from 'next-i18next';
import { Typography } from '@/components/general/Typography';
import TileButton from '@/components/general/TileButton/TileButton';
import { Tile } from '@/components/dataDisplay/Tile';
import { Modal } from '@/components/feedback/Modal';
import { GetStaticPaths } from 'next';
import BackdropLoading from '@/components/feedback/BackdropLoading/BackdropLoading';

const { Text, Title } = Typography;

const AccountDetailsPage: NextPageWithLayout = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { id } = router.query;

  const [accountInfo, setAccountInfo] = useState<Res_Account_Id>();
  const [connections, setConnections] = useState<Res_Connection_All>([]);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [record, setRecord] = useState(null);

  const getAccountDetails = useCallback(async () => {
    const response: AxiosResponse<Res_Account_Id> =
      await AccountService.getAccount(id as string);
    setAccountInfo(response.data);
  }, [id]);

  const getConnections = useCallback(async () => {
    const params = {
      account_id: id as string,
    };
    const response: AxiosResponse<Res_Connection_All> =
      await ConnectionService.getConnections(params);
    setConnections(response.data);
  }, [id]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await getAccountDetails();
        await getConnections();
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    })();
  }, [getAccountDetails, getConnections]);

  const modalHandler = () => {
    setOpenModal(!openModal);
    if (openModal) {
      setRecord(null);
    }
  };

  const onEdit = () => {
    modalHandler();
  };

  return (
    <>
      <BackdropLoading loading={loading} />
      {accountInfo && (
        <InfoSection
          username={accountInfo.username}
          follows={accountInfo.information.follows_count}
          name={accountInfo.information.name}
          avatar={
            <Avatar
              type="image"
              url={accountInfo.profile_image}
              size={7}
              click={() => {}}
            />
          }
          description={accountInfo.information.biography}
          followers={accountInfo.information.followers_count}
        />
      )}

      <div className="flex m-5">
        <Title level="h2" size="lg" weight="semiBold">
          {t('connections')}
        </Title>
      </div>

      <div className="flex flex-wrap">
        <div className="basis-1/6 m-3 ">
          <TileButton onClick={modalHandler} title={t('add-new-connection')} />
        </div>
        {connections?.map((connection) => {
          return (
            <div className="basis-1/6 m-3" key={connection.id}>
              <Tile
                data={connection}
                avatar={
                  <Avatar
                    icon={
                      Application[
                        connection.application_name as unknown as keyof typeof Application
                      ]
                    }
                    size={6}
                    type="icon"
                    click={() => {}}
                  />
                }
                width="255px"
                height="255px"
                click={onEdit}
                clickColor="secondary"
                clickLabel={t('edit')}
                remove={() => {}}
              >
                <div className="flex flex-col">
                  <Text weight="semiBold"> {connection.name} </Text>
                  <Text weight="light" color="nonActive">
                    {connection.description}
                  </Text>
                </div>
              </Tile>
            </div>
          );
        })}
      </div>

      <Modal
        isVisible={openModal}
        cancel={modalHandler}
        title={record ? t('edit-connection') : t('add-new-connection')}
        submit={() => {}}
        width="50%"
      >
        <></>
      </Modal>
    </>
  );
};

export default AccountDetailsPage;

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

AccountDetailsPage.getLayout = (page) => {
  const updateConnectionMenu = [
    ...accountsMenu,
    {
      key: 'account-info',
      path: Path.Accounts + '/[id]',
    },
  ];
  return (
    <DashboardLayout
      topMenu={updateConnectionMenu}
      meta={{ title: 'Accounts' }}
    >
      {page}
    </DashboardLayout>
  );
};
