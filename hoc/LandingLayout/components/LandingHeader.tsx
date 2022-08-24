import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import landingMenu from 'assets/contents/landingMenu';
import Logo from '../../../assets/svg/botinow-logo.svg';
import useTranslation from 'next-translate/useTranslation';

const LandingHeader: React.FC<LandingHeaderProps> = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const { t } = useTranslation('common');

  const onLogin = () => {
    router.push('/auth/login');
  };

  const onRegister = () => {
    router.push('/auth/register');
  };

  const gotoDashboard = () => {
    router.push('/dashboard/connections/accounts');
  };

  return (
    <div
      id="header"
      className="w-full flex flex-col sm:flex-row justify-between items-center py-1 px-2"
    >
      <div className="logo px-4">
        <Link href="/">
          <a href="replace" className="flex justify-center items-center">
            <Logo className="w-12 px-1 mx-1" />
            <p className="font-bold text-2xl">Now</p>
            <p className="text-2xl">boti</p>
          </a>
        </Link>
      </div>

      <div className="menu flex flex-wrap justify-center items-center">
        {landingMenu.map((item: any) => (
          <Link href={item.path} key={item.path}>
            <a className="mx-4">{t(item.title)}</a>
          </Link>
        ))}
      </div>
      <div className="auth px-4 flex justify-center items-center my-4 sm:m-0">
        {isLoggedIn ? (
          <button className="primary my-auto mx-4" onClick={gotoDashboard}>
            <span className="relative ">{`Your Panel`}</span>
          </button>
        ) : (
          <>
            <button className="py-3 px-6" onClick={onLogin}>
              {t('login')}
            </button>
            <button className="primary py-3 px-6" onClick={onRegister}>
              {t('register')}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LandingHeader;
