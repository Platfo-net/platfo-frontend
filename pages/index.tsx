import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef } from 'react';
import { AuthState } from '../stores/reducers/authReducer';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { loggedIn, loggedOut } from '../stores/actions/authAction';
import useTranslation from 'next-translate/useTranslation';
import LandingLayout from 'hoc/LandingLayout/LandingLayout';
import AdvantagesCard from 'components/AdvantagesCard/AdvantagesCard';
import ContactForm from 'containers/home/ContactForm/ContactForm';
import PricingPanels from 'containers/home/PricingPanels/PricingPanels';
import MacBook from '../assets/svg/macbook.svg';
import WalletIcon from '../assets/svg/wallet.svg';
import TimeIcon from '../assets/svg/time.svg';
import SatisfyIcon from '../assets/svg/satisfy.svg';
import CostIcon from '../assets/svg/cost.svg';
import DownArrow from "../assets/svg/down-arrow.svg"
import Customers from 'assets/contents/customers';

const cards = [
  {
    icon: <TimeIcon />,
    title: 'response-24-7',
    description: 'landing-cards-description-1',
  },
  {
    icon: <CostIcon />,
    title: 'sales-increase',
    description: 'landing-cards-description-2',
  },
  {
    icon: <WalletIcon />,
    title: 'saving-money-and-time',
    description: 'landing-cards-description-3',
  },

  {
    icon: <SatisfyIcon />,
    title: 'satisfying-customers',
    description: 'landing-cards-description-4',
  },
];

const Home: NextPage = () => {
  const { isLoggedIn } = useSelector((state: AuthState) => ({
    isLoggedIn: state.auth.isLoggedIn,
  }));
  const router = useRouter();
  const dispatch = useDispatch();
  const { locale } = router;
  const changeLocale = useCallback(
    (newLocale) => {
      if (newLocale === 'fa-IR') {
        document.querySelector('body').dir = 'rtl';
      } else {
        document.querySelector('body').dir = 'ltr';
      }
      router.push(router.pathname, router.pathname, { locale: newLocale });
    },
    [router]
  );

  let { t } = useTranslation('common');

  const onClick = async () => {
    console.log(isLoggedIn);
    if (!isLoggedIn) {
      try {
        const data = {
          email: 'dfdfddf',
          password: 'gdgdggdg',
        };
        await dispatch(loggedIn(data));
      } catch (e) { }
    } else {
      dispatch(loggedOut());
    }
  };

  useEffect(() => {
    if (typeof window !== undefined) {
      window.scrollTo(window.scrollX, window.scrollY - 100);
    }
  }
  , [])

  const scrollHandler = () => {
    if (window !== undefined) {
      window.scrollBy({
        top: window.innerHeight - 100,
        behavior: 'smooth'
      });
    }
  }

  const onRegister = () => {
    router.push('/auth/register');
  };

  return (
    <LandingLayout>
      <div className="landing-body flex flex-col items-center justify-center">
        <div
          id="intro"
          className="flex flex-col-reverse justify-end lg:flex-row lg:justify-center relative">
          <div className="basis-1/2 lg:basis-2/5 xl:basis-1/3 flex flex-col justify-center items-center md:items-start">
            <p className="main-title text-center md:text-left font-extrabold text-5xl md:text-6xl lg:text-5xl 2xl:text-8xl">
              {t('landing-intro-main-title')}
            </p>
            <p className="description text-center md:text-left text-lg xl:text-xl">
              {t('landing-intro-description')}
            </p>
            <div className='flex justify-center lg:justify-start space-x-4 mt-5'>
              <div className='flex flex-col items-center'>
                <button className="secondary px-4 h-14 w-36" onClick={onRegister}>
                  {t('get-started')}
                </button>
                <span className='text-sm my-1 font-medium'>7 Days free trial!</span>
              </div>
              <button className="primary out-line px-4 h-14 w-36">
                {t('online-demo')}
              </button>
            </div>
          </div>
          <div className="intro-img relative flex items-center">
            <MacBook />
          </div>
          <div className='intro-down-arrow hidden md:block absolute animate-bounce'>
            <a onClick={scrollHandler}> <DownArrow /></a>
          </div>
        </div>

        <div id='customers' className='flex flex-col items-center w-full h-max 4 mt-16'>
          <div className='customers-content'>
            {Customers.map((item) => (
              <div key={item.title} id={item.id}><a href={item.link}>{item.logo}</a></div>
            ))}          
          </div>
        </div>
        <div
          id="cards"
          className="flex flex-col items-center justify-center mt-12"
        >
          <div className="title w-full flex justify-start">
            <p className="font-extrabold text-2xl">
              {t('landing-cards-section-2-title')}
            </p>
          </div>

          <div>
            <div className="my-5 flex flex-col sm:flex-row sm:justify-center flex-wrap">
              {cards.map((item) => (
                <div key={item.title} className="md:basis-2/4 lg:basis-1/4">
                  <AdvantagesCard data={item} />
                </div>
              ))}
            </div>
          </div>

          <div
            id="support"
            className="blue-gradient-card flex flex-wrap items-center mt-12"
          >
            <div className="sm:basis-6/12">
              <p className="title font-extrabold text-2xl">
                {t('landing-support-title')}
              </p>
              <p className="description text-base">
                {t('landing-support-description')}{' '}
              </p>
            </div>
            <div className="sm:basis-6/12">
              <ContactForm />
            </div>
          </div>

          <div
            id="pricing"
            className="w-full flex flex-wrap justify-evenly my-16"
          >
            <PricingPanels />
          </div>
        </div>
      </div>
    </LandingLayout>
  );
};

export default Home;
