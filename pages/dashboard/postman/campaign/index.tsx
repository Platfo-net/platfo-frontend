import { NextPageWithLayout } from '@/types/next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { postmanMenu } from '@/constants/dashboardMenu';
import { Tile } from '@/components/dataDisplay/Tile';
import { Avatar } from '@/components/dataDisplay/Avatar';
import { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import {
  IAccount,
  ICampaign,
  Res_Account_All,
  Res_Postman_Campaign_FacebookPageId,
} from '@/types/api';
import { Typography } from '@/components/general/Typography';
import BackdropLoading from '@/components/feedback/BackdropLoading/BackdropLoading';
import AccountService from '@/services/endpoints/AccountService';
import { Platform } from '@/constants/enums';
import PostmanService from '@/services/endpoints/PostmanService';

const { Text } = Typography;

const CampaignsPage: NextPageWithLayout = () => {
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState<Res_Account_All>([]);
  const [campaigns, setCampaigns] = useState<ICampaign[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<IAccount>();

  const getAccounts = async () => {
    try {
      setLoading(true);
      const response: AxiosResponse<Res_Account_All> =
        await AccountService.getAccounts();
      setAccounts(response.data);
      if (response.data.length > 0) {
        setLoading(false);
        return response.data[0];
      } else {
        setLoading(false);
        return null;
      }
    } catch (e) {
      setLoading(false);
      return null;
    }
  };

  const getCampaigns = async (pageId: string) => {
    try {
      setLoading(true);
      const response: AxiosResponse<Res_Postman_Campaign_FacebookPageId> =
        await PostmanService.getCampaigns(pageId);
      setCampaigns(response.data.items);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const changeSelectedAccount = async (account: IAccount) => {
    await getCampaigns(account.page_id);
    setSelectedAccount(account);
  };

  useEffect(() => {
    (async () => {
      const firstAccount = await getAccounts();
      if (firstAccount) {
        setSelectedAccount(firstAccount);
        await getCampaigns(firstAccount.page_id);
      } else {
        setCampaigns([]);
      }
    })();
  }, []);

  return (
    <>
      <BackdropLoading loading={loading} />
      {accounts.length > 0 && (
        <Tile className="m-3" width="auto">
          <div className="flex w-full space-x-4 justify-start overflow-x-auto">
            {accounts.map((account) => {
              return (
                <Avatar
                  key={account.id}
                  url={account.profile_image}
                  type="image"
                  click={changeSelectedAccount}
                  data={account}
                  isActive={account.id === selectedAccount?.id}
                  color="postman"
                  icon={
                    Platform[
                      account.platform as unknown as keyof typeof Platform
                    ]
                  }
                  title={account.username}
                />
              );
            })}
          </div>
        </Tile>
      )}

      <div className="flex flex-wrap">
        {selectedAccount && (
          <div className="basis-1/6 m-3 ">
            {/*<ContactGroupForm*/}
            {/*  pageId={selectedAccount.page_id}*/}
            {/*  change={() => getGroups(selectedAccount.page_id)}*/}
            {/*/>*/}
          </div>
        )}

        {campaigns?.map((campaign) => {
          return (
            <div className="basis-1/6 m-3" key={campaign.id}>
              <Tile
                data={campaign}
                width="255px"
                height="255px"
                // click={changeRoute}
                // clickColor="postman"
                // clickLabel={t('details')}
              >
                <div className="flex flex-col text-center w-full">
                  <Text weight="semiBold"> {campaign.name} </Text>
                  <Text weight="light" color="nonActive">
                    {campaign.description}
                  </Text>
                </div>
              </Tile>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CampaignsPage;

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

CampaignsPage.getLayout = (page) => {
  return (
    <DashboardLayout
      topMenu={postmanMenu}
      meta={{ title: 'Campaigns' }}
      color="postman"
    >
      {page}
    </DashboardLayout>
  );
};
