import type { NextPage } from 'next';
import Head from 'next/head';
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
import landingContents from 'assets/contents/landingContents.json';
import IphoneImg from '../assets/img/iphone.png';
import WalletIcon from '../assets/svg/wallet.svg';
import TimeIcon from '../assets/svg/time.svg';
import SatisfyIcon from '../assets/svg/satisfy.svg';
import CostIcon from '../assets/svg/cost.svg';
import Image from 'next/image';

const cards = [
  {
    icon: <TimeIcon />,
    title: '24/7 response',
    description: 'cards-description-1',
  },
  {
    icon: <CostIcon />,
    title: 'sales increase',
    description: 'cards-description-2',
  },
  {
    icon: <WalletIcon />,
    title: 'Saving money and time',
    description: 'cards-description-3',
  },

  {
    icon: <SatisfyIcon />,
    title: 'Satisfying customers',
    description: 'cards-description-4',
  },
];

const Home: NextPage = () => {
  let { t } = useTranslation('common');

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

  const onClick = async () => {
    console.log(isLoggedIn);

    if (!isLoggedIn) {
      try {
        const data = {
          email: 'dfdfddf',
          password: 'gdgdggdg',
        };
        await dispatch(loggedIn(data));

        // router.push("/dashboard");
      } catch (e) {}
    } else {
      dispatch(loggedOut());
    }
  };

  return (
    <LandingLayout>
      <div className="p-4 sm:p-8 md:p-12 lg:p-24 flex flex-col items-center">
        <div id="intro" className="gradient-card flex flex-col sm:flex-row ">
          <div>
            <p className="main-title text-4xl rtl:text-right ltl:text-left">
              {t('landing-main-title')}
            </p>
            <p className="slogan">{t('landing-slogan')} </p>
            <p className="d-block description">{t('landing-description')}</p>
            <button className="primary mt-5 px-6 py-3">
              {t('online-demo')}
            </button>
          </div>
          <div className="iphone relative w-2/3 md:w-full lg:w-1/2 xl:-top-36 mr-auto">
            <Image className="absolute " src={IphoneImg} alt="" />
          </div>
        </div>

        <div
          id="cards"
          className="flex flex-col items-center justify-center after:sections mt-8"
        >
          <div className="w-full flex justify-start">
            <p className="title">{t('landing-section-2-title')}</p>
          </div>

          <div>
            <div className="my-5 flex flex-col space-y-6 md:space-y-0 sm:flex-row justify-center flex-wrap">
              {cards.map((item) => (
                <div key={item.title} className="md:basis-2/4 lg:basis-1/4">
                  <AdvantagesCard data={item} />
                </div>
              ))}
            </div>
          </div>
          <div
            id="support"
            className="blue-gradient-card flex flex-col flex-wrap lg:flex-nowrap xl:flex-row justify-center items-center mt-12 max-w-screen-2xl"
          >
            <div className="w-full xl:w-3/5 flex flex-wrap justify-center xl:justify-start">
              <p className="title">{t('landing-help-title')}</p>
              <p className="description d-block w-2/3">
                {t('landing-help-description')}{' '}
              </p>
            </div>
            <div>
              <ContactForm />
            </div>
          </div>
          <div
            id="pricing"
            className="sections flex flex-wrap justify-center items-center my-12"
          >
            <PricingPanels />
          </div>
        </div>
      </div>
    </LandingLayout>
  );
};

export default Home;
