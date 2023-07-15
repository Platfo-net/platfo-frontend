import { NextPageWithLayout } from '@/types/next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Input } from '@/components/dataEntry/Input/Input';
import { Button } from '@/components/general/Button';
import { Typography } from '@/components/general/Typography';
import { Body_Auth_AccessToken } from '@/types/api';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/stores/reduxHooks';
import { login } from '@/stores/reducers/auth';
import { Path } from '@/constants/enums';
import { AuthLayout } from '@/components/layouts/AuthLayout';

const LoginPage: NextPageWithLayout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Body_Auth_AccessToken>();
  const { t } = useTranslation('common');
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { requestState, token, error } = useAppSelector(({ auth }) => ({
    requestState: auth.requestState,
    token: auth.token,
    error: auth.error,
  }));

  if (Boolean(token) && !error) {
    router.push(Path.Accounts);
  }

  const submit = (data: Body_Auth_AccessToken) => {
    dispatch(login(data));
  };

  return (
    <div>
      <Typography.Title
        level="h3"
        size="2xl"
        weight="bold"
        className="flex justify-center mb-4"
      >
        {t('login')}
      </Typography.Title>
      <form className="px-16 pb-0 my-8" onSubmit={handleSubmit(submit)}>
        <div className="mb-10">
          <Input
            placeholder="example@gmail.com"
            feedback={errors.email?.message}
            color={errors.email?.message ? 'danger' : 'default'}
            {...register('email', {
              required: t('error-required-field'),
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: t('error-invalid-email'),
              },
            })}
          />
          <Input
            type="password"
            className="mt-8"
            placeholder="password"
            color={errors.password?.message ? 'danger' : 'default'}
            feedback={errors.password?.message}
            {...register('password', {
              required: t('error-required-field'),
              minLength: { value: 3, message: t('error-min-length') },
            })}
          />
        </div>
        <div className="flex flex-col items-center justify-between mt-10">
          <Button
            type="submit"
            title={t('login')}
            color="secondary"
            width="100%"
            className="mb-4"
            isLoading={requestState === 'pending'}
          />
          {/* <Button
            type="button"
            onClick={() => router.push('/auth/register')}
            title={t('register')}
            variant="text"
          />*/}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

export const getStaticProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
};

LoginPage.getLayout = (page) => {
  return (
    <AuthLayout meta={{ title: 'Login', description: 'Login Botinow' }}>
      {page}
    </AuthLayout>
  );
};
