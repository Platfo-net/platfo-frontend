import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { AuthState } from '../stores/reducers/authReducer';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { loggedIn, loggedOut } from '../stores/actions/authAction';
import useTranslation from 'next-translate/useTranslation';
import LandingLayout from 'hoc/LandingLayout/LandingLayout';
import AdvantagesCard from 'components/AdvantagesCard/AdvantagesCard';
import ContactForm from 'containers/home/ContactForm/ContactForm';
import PricingPanels from 'containers/home/PricingPanels/PricingPanels';
import IphoneImg from '../assets/img/iphone.png';
import WalletIcon from '../assets/svg/wallet.svg';
import TimeIcon from '../assets/svg/time.svg';
import SatisfyIcon from '../assets/svg/satisfy.svg';
import CostIcon from '../assets/svg/cost.svg';

import Image from 'next/image';

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
      } catch (e) {}
    } else {
      dispatch(loggedOut());
    }
  };

  return (
    <LandingLayout>
      <div className="landing-body my-16 flex flex-col items-center">
      <div
          id="intro"
          className="gradient-card flex flex-col sm:justify-between sm:flex-row mt-12 "
        style={{direction : "rtl"}}>
          <div className="basis-1/2">
            <p className="main-title text-2xl font-extrabold sm:text-4xl rtl:text-right ltr:text-left">
              {t('landing-intro-main-title')}
            </p>
            <p className="sub-title font-bold sm:text-2xl">
              {t('landing-intro-sub-title')}
            </p>
            <p className="description text-lg">
              {t('landing-intro-description')}
            </p>
            <button className="primary mt-5 px-6 py-3">
              {t('online-demo')}
            </button>
          </div>
          <div className="intro-img relative flex items-center mt-8 md:mt-0 lg:-top-4 xl:-top-12">
            <Image className="absolute" src={IphoneImg} alt="" />
          </div>
        </div>

        <div
          id="cards"
          className="flex flex-col items-center justify-center mt-8"
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
            className="w-full flex flex-wrap justify-evenly my-12"
          >
            <PricingPanels />
          </div>
        </div>
      </div>
    </LandingLayout>
  );
};

export default Home;
