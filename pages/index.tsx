import { NextPageWithLayout } from '@/types/next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { AuthLayout } from '@/components/layouts/AuthLayout';

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
    <AuthLayout
      meta={{
        title: '',
        description: undefined,
      }}
    >
      {page}
    </AuthLayout>
  );
};
