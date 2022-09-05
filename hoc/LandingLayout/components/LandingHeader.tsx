import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import landingMenu from 'assets/contents/landingMenu';
import Logo from '../../../assets/svg/botinow-logo.svg';
import NavBarOpen from '../../../assets/svg/navbar-open.svg';
import NavBarCross from '../../../assets/svg/navbar-cross.svg';
import useTranslation from 'next-translate/useTranslation';

type LandingHeaderProps = {};

const LandingHeader: React.FC<LandingHeaderProps> = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const { t } = useTranslation('common');

  const onRegister = () => {
    router.push('/auth/register');
  };

  const gotoDashboard = () => {
    router.push('/dashboard/connections/accounts');
  };

  const openNav = () => {
    const el: any = document.querySelector('.menu');
    el?.classList.remove("disable");
    el?.classList.add("enable", "flex-col-reverse");

    const btn: any = document.querySelector('.hamberger-menu-btn');
    btn?.classList.add("opened");
    btn?.classList.remove("closed");
  }

  const closeNav = () => {
    const el: any = document.querySelector('.menu');
    el?.classList.remove("enable", "flex-col-reverse");
    el?.classList.add("disable");

    const btn: any = document.querySelector('.hamberger-menu-btn');
    btn?.classList.add("closed");
    btn?.classList.remove("opened");
  }

  return (
    <div
      id="header"
      className="w-full flex items-center py-4 px-2 md:px-10"
    >
      <div className="logo px-4">
        <Link href="/">
          <a href="replace" className="flex">
            {/* TODO: change it with updated one */}
            <Logo className="w-12 md:w-16 px-1 mx-1 -mt-1" />
          </a>
        </Link>
      </div>
      <div className='hamberger-menu-btn closed ml-auto'>
        <button className='open-btn' onClick={openNav}>
          <NavBarOpen />
        </button>
        <button className='close-btn' onClick={closeNav}>
          <NavBarCross />
        </button>
      </div>
      <div className='menu w-full flex justify-center items-center'>
        <div className="menu-content w-full flex items-center flex-col-reverse xl:flex-row">
          <div className='w-full flex items-center flex-col space-y-4 xl:space-y-0 xl:flex-row'>
          {landingMenu.map((item: any) => (
            item.children !== undefined ?
              <div className={`drpdwn-menu ${item.class}`}>
                <button className='drpbtn text-base font-normal'>{t(item.title)}</button>
                <div className='drpdwn-content'>
                  {item.children.map((child: any) => (
                    <Link href={child.path} key={child.title}>
                      <a className="px-4 py-1">{t(child.title)}</a>
                    </Link>))
                  }
                </div>
              </div>
              :
              <Link href={item.path} key={item.path} className={item.class}>
                <a className="mx-4">{t(item.title)}</a>
              </Link>
          ))}
          </div>
          <div className='w-40 flex justify-center my-4'>
          {isLoggedIn ? (
            <button className="primary text-center align-middle" onClick={gotoDashboard}>
              <span className="relative ">{`Your Panel`}</span>
            </button>
          ) : (
            <>
              <button className="secondary text-center align-middle" onClick={onRegister}>
                {t('get-started')}
              </button>
            </>
          )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default LandingHeader;
