import { useRouter } from 'next/router';
import { AxiosResponse } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { postmanMenu } from '@/constants/dashboardMenu';
import { NextPageWithLayout } from '@/types/next';
import { Path } from '@/constants/enums';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import InfoSection from '@/components/dataDisplay/InfoSection/InfoSection';
import { Avatar } from '@/components/dataDisplay/Avatar';
import { GetStaticPaths } from 'next';
import BackdropLoading from '@/components/feedback/BackdropLoading/BackdropLoading';
import LiveChatService from '@/services/endpoints/LiveChatService';
import { IContact, Res_LiveChat_Contact_Id } from '@/types/api';

const ContactDetailsPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { id } = router.query;

  const [contactInfo, setContactInfo] = useState<IContact>();
  const [loading, setLoading] = useState(false);

  const getContactDetails = useCallback(async () => {
    const response: AxiosResponse<Res_LiveChat_Contact_Id> =
      await LiveChatService.getContact(id as string);
    setContactInfo(response.data);
  }, [id]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await getContactDetails();
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    })();
  }, [getContactDetails]);

  return (
    <>
      <BackdropLoading loading={loading} />
      {contactInfo && (
        <InfoSection
          username={contactInfo.information.username}
          follows={contactInfo.information.follows_count}
          name={contactInfo.information.name}
          avatar={
            <Avatar
              type="image"
              url={contactInfo.information.profile_image}
              size={7}
              click={() => {}}
            />
          }
          description={contactInfo.information.biography}
          followers={contactInfo.information.followers_count}
        />
      )}
    </>
  );
};

export default ContactDetailsPage;

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

ContactDetailsPage.getLayout = (page) => {
  const updatePostmanMenu = [
    ...postmanMenu,
    {
      key: 'contact-info',
      path: Path.PostmanContacts + '/[id]',
    },
  ];
  return (
    <DashboardLayout
      topMenu={updatePostmanMenu}
      meta={{ title: 'Contact Details' }}
    >
      {page}
    </DashboardLayout>
  );
};
