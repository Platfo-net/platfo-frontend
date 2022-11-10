import { NextPageWithLayout } from '@/types/next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { postmanMenu } from '@/constants/dashboardMenu';
import { Tile } from '@/components/dataDisplay/Tile';
import { Avatar } from '@/components/dataDisplay/Avatar';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import {
  IAccount,
  IContact,
  Res_Account_All,
  Res_LiveChat_Contact_All_PageId,
} from '@/types/api';
import { Typography } from '@/components/general/Typography';
import BackdropLoading from '@/components/feedback/BackdropLoading/BackdropLoading';
import AccountService from '@/services/endpoints/AccountService';
import LiveChatService from '@/services/endpoints/LiveChatService';
import IconText from '@/components/dataDisplay/IconText/IconText';
import { Path, Platform } from '@/constants/enums';
import { useRouter } from 'next/router';

const { Text } = Typography;

const ContactsPage: NextPageWithLayout = () => {
  const { t } = useTranslation('common');
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState<Res_Account_All>([]);
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<IAccount>();
  const router = useRouter();

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

  const getContacts = async (pageId: string) => {
    try {
      setLoading(true);
      const response: AxiosResponse<Res_LiveChat_Contact_All_PageId> =
        await LiveChatService.getContacts(pageId);
      setContacts(response.data.items);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const changeSelectedAccount = async (account: IAccount) => {
    await getContacts(account.page_id);
    setSelectedAccount(account);
  };

  const changeRoute = (contact: IContact) => {
    router.push(
      Path.PostmanContacts + '/[id]',
      Path.PostmanContacts + '/' + contact.id
    );
  };

  useEffect(() => {
    (async () => {
      const firstAccount = await getAccounts();
      if (firstAccount) {
        setSelectedAccount(firstAccount);
        await getContacts(firstAccount.page_id);
      } else {
        setContacts([]);
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
        {contacts?.map((contact) => {
          return (
            <div className="basis-1/6 m-3" key={contact.id}>
              <Tile
                data={contact}
                avatar={
                  <Avatar
                    url={contact.information.profile_image}
                    size={6}
                    type="image"
                  />
                }
                width="280px"
                height="280px"
                click={changeRoute}
                clickColor="postman"
                clickLabel={t('details')}
              >
                <div className="flex flex-col text-center w-full">
                  <Text weight="semiBold"> {contact.information.name} </Text>
                  <div className="flex justify-between mt-4 mx-4 ">
                    <IconText
                      icon="Comment"
                      title={contact.comment_count.toString()}
                    />
                    <IconText
                      icon="PaperPlane"
                      title={contact.message_count.toString()}
                    />
                    <IconText
                      icon="LiveComment"
                      title={contact.live_comment_count.toString()}
                    />
                  </div>
                </div>
              </Tile>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ContactsPage;

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

ContactsPage.getLayout = (page) => {
  return (
    <DashboardLayout
      topMenu={postmanMenu}
      meta={{ title: 'Postman' }}
      color="postman"
    >
      {page}
    </DashboardLayout>
  );
};
