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
  IContactGroup,
  Res_Account_All,
  Res_Postman_Group_FacebookPageId,
} from '@/types/api';
import { Typography } from '@/components/general/Typography';
import BackdropLoading from '@/components/feedback/BackdropLoading/BackdropLoading';
import AccountService from '@/services/endpoints/AccountService';
import { Platform } from '@/constants/enums';
import PostmanService from '@/services/endpoints/PostmanService';
import ContactGroupForm from '@/components/pages/ContactGroupForm';
import { AvatarGroup } from '@/components/dataDisplay/AvatarGroup';

const { Text } = Typography;

const GroupsPage: NextPageWithLayout = () => {
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState<Res_Account_All>([]);
  const [groups, setGroups] = useState<IContactGroup[]>([]);
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

  const getGroups = async (pageId: string) => {
    try {
      setLoading(true);
      const response: AxiosResponse<Res_Postman_Group_FacebookPageId> =
        await PostmanService.getGroups(pageId);
      setGroups(response.data.items);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const changeSelectedAccount = async (account: IAccount) => {
    await getGroups(account.page_id);
    setSelectedAccount(account);
  };

  const removeGroup = async (group: IContactGroup) => {
    try {
      setLoading(true);
      await PostmanService.deleteGroup(group.id);
      await getAccounts();
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      const firstAccount = await getAccounts();
      if (firstAccount) {
        setSelectedAccount(firstAccount);
        await getGroups(firstAccount.page_id);
      } else {
        setGroups([]);
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
            <ContactGroupForm
              pageId={selectedAccount.page_id}
              change={() => getGroups(selectedAccount.page_id)}
            />
          </div>
        )}

        {groups?.map((group) => {
          return (
            <div className="basis-1/6 m-3" key={group.id}>
              <Tile
                data={group}
                avatar={
                  <AvatarGroup
                    urlKey="profile_image"
                    size={5}
                    count={10}
                    data={group.contacts}
                    nameKey="username"
                    className="mt-5"
                  />
                }
                width="255px"
                height="255px"
                // click={changeRoute}
                // clickColor="postman"
                // clickLabel={t('details')}
                remove={removeGroup}
              >
                <div className="flex flex-col text-center w-full">
                  <Text weight="semiBold"> {group.name} </Text>
                  <Text weight="light" color="nonActive">
                    {group.description}
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

export default GroupsPage;

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

GroupsPage.getLayout = (page) => {
  return (
    <DashboardLayout
      topMenu={postmanMenu}
      meta={{ title: 'Groups' }}
      color="postman"
    >
      {page}
    </DashboardLayout>
  );
};
