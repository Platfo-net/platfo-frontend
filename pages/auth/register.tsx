import { NextPageWithLayout } from '@/types/next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { AuthLayout } from '@/components/layouts/AuthLayout';

const RegisterPage: NextPageWithLayout = () => {
  return <div>ghgh</div>;
};

export default RegisterPage;

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

RegisterPage.getLayout = (page) => {
  return (
    <AuthLayout
      meta={{
        title: 'Botinow',
        description: '',
      }}
    >
      {page}
    </AuthLayout>
  );
};
