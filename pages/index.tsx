import { NextPageWithLayout } from '@/types/next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { MainLayout } from '@/components/layouts/MainLayout';

const Home: NextPageWithLayout = () => {
  return <div />;
};

export default Home;

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

Home.getLayout = (page) => {
  return (
    <MainLayout
      meta={{
        title: '',
        description: undefined,
      }}
    >
      {page}
    </MainLayout>
  );
};
