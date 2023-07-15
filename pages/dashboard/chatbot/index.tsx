import { NextPageWithLayout } from '@/types/next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { chatbotMenu } from '@/constants/dashboardMenu';
import { Tile } from '@/components/dataDisplay/Tile';
import { Avatar } from '@/components/dataDisplay/Avatar';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { IChatflow, Res_BotBuilder_Chatflow_All } from '@/types/api';
import { Typography } from '@/components/general/Typography';
import TileButton from '@/components/general/TileButton/TileButton';
import BotBuilderService from '@/services/endpoints/BotBuilderService';
import { Application } from '@/constants/enums';
import { getFormattedDate, getFormattedTime } from '@/lib/dateAndTimeHelper';
import BackdropLoading from '@/components/feedback/BackdropLoading/BackdropLoading';

const { Text } = Typography;

const ChatbotPage: NextPageWithLayout = () => {
  const { t } = useTranslation('common');
  const [loading, setLoading] = useState(false);
  const [chatflows, setChatflows] = useState<Res_BotBuilder_Chatflow_All>([]);

  const getChatflows = async () => {
    try {
      setLoading(true);
      const response: AxiosResponse<Res_BotBuilder_Chatflow_All> =
        await BotBuilderService.getChatflows();
      const changeData = response.data.map((item) => ({
        ...item,
        date:
          getFormattedDate(item.updated_at) +
          ' - ' +
          getFormattedTime(item.updated_at),
      }));
      setChatflows(changeData);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const removeChatflow = async (chatflow: IChatflow) => {
    try {
      setLoading(true);
      await BotBuilderService.deleteChatflow(chatflow.id);
      await getChatflows();
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getChatflows();
  }, []);

  return (
    <>
      <BackdropLoading loading={loading} />
      <div className="flex flex-wrap">
        <div className="basis-1/6 m-3 ">
          <TileButton
            onClick={() => {}}
            title={t('add-new-account')}
            color="chatbot"
          />
        </div>
        {chatflows?.map((chatflow) => {
          return (
            <div className="basis-1/6 m-3" key={chatflow.id}>
              <Tile
                data={chatflow}
                avatar={
                  <Avatar
                    icon={Application.BOT_BUILDER}
                    size={6}
                    type="icon"
                    click={() => {}}
                  />
                }
                width="255px"
                height="255px"
                click={() => {}}
                clickColor="chatbot"
                clickLabel={t('details')}
                remove={removeChatflow}
              >
                <div className="flex flex-col text-center">
                  <Text weight="semiBold"> {chatflow.name} </Text>
                  <Text weight="light" color="nonActive">
                    {chatflow.date}
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

export default ChatbotPage;

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

ChatbotPage.getLayout = (page) => {
  return (
    <DashboardLayout
      topMenu={chatbotMenu}
      meta={{ title: 'Chat Bot' }}
      color="chatbot"
    >
      {page}
    </DashboardLayout>
  );
};
