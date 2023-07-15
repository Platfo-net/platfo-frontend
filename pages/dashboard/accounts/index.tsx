import { NextPageWithLayout } from '@/types/next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { accountsMenu } from '@/constants/dashboardMenu';
import { Tile } from '@/components/dataDisplay/Tile';
import { Avatar } from '@/components/dataDisplay/Avatar';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import AccountService from '@/services/endpoints/AccountService';
import { AxiosResponse } from 'axios';
import { IAccount, Res_Account_All } from '@/types/api';
import { Typography } from '@/components/general/Typography';
import TileButton from '@/components/general/TileButton/TileButton';
import { useRouter } from 'next/router';
import { Path, Platform } from '@/constants/enums';
import InstagramService from '@/services/endpoints/InstagramService';
import BackdropLoading from '@/components/feedback/BackdropLoading/BackdropLoading';

const { Text } = Typography;

const AccountsPage: NextPageWithLayout = () => {
  const { t } = useTranslation('common');
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState<Res_Account_All>([]);
  const router = useRouter();

  const getAccounts = async () => {
    try {
      setLoading(true);
      const response: AxiosResponse<Res_Account_All> =
        await AccountService.getAccounts();
      setAccounts(response.data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const changeRoute = (account: IAccount) => {
    router.push(Path.Accounts + '/[id]', Path.Accounts + '/' + account.id);
  };

  const disconnectAccount = async (account: IAccount) => {
    try {
      setLoading(true);
      await AccountService.deleteAccount(account.id);
      await getAccounts();
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const addAccount = () => {
    try {
      setLoading(true);
      window.FB.login(
        async (response: any) => {
          if (response.authResponse) {
            const data = {
              facebook_user_id: response.authResponse.userID,
              facebook_user_token: response.authResponse.accessToken,
            };
            await InstagramService.postToConnectInstagram(data);
            await getAccounts();
            // FB.api('/me', function (response) {
            //   console.log('Good to see you, ' + response.name + '.');
            // });
            setLoading(false);
          } else {
            setLoading(false);
          }
        },
        {
          scope:
            'public_profile,email,pages_show_list,pages_manage_metadata,pages_read_engagement,' +
            'instagram_manage_messages,instagram_basic',
        }
      );
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAccounts();
  }, []);

  return (
    <>
      <BackdropLoading loading={loading} />
      <div className="flex flex-wrap">
        <div className="basis-1/6 m-3 ">
          <TileButton onClick={addAccount} title={t('add-new-account')} />
        </div>
        {accounts?.map((account) => {
          return (
            <div className="basis-1/6 m-3" key={account.id}>
              <Tile
                data={account}
                avatar={
                  <Avatar
                    url={account.profile_image}
                    size={6}
                    type="image"
                    icon={
                      Platform[
                        account.platform as unknown as keyof typeof Platform
                      ]
                    }
                  />
                }
                width="255px"
                height="255px"
                click={changeRoute}
                clickColor="secondary"
                clickLabel={t('details')}
                remove={disconnectAccount}
              >
                <Text weight="semiBold"> {account.username} </Text>
              </Tile>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AccountsPage;

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

AccountsPage.getLayout = (page) => {
  return (
    <DashboardLayout topMenu={accountsMenu} meta={{ title: 'Accounts' }}>
      {page}
    </DashboardLayout>
  );
};
