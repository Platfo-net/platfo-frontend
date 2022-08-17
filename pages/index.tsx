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

const cards = [
  {
    icon: <TimeIcon />,
    title: '24/7 response',
    description:
      'By building a chatbot with the help of Batinow and connecting it to your social network account, you can intelligently send messages to your customers and contacts and stay in touch with them around the clock.',
  },
  {
    icon: <CostIcon />,
    title: 'sales increase',
    description:
      'With the help of Batinow, you can automatically send messages to people who follow a number for the first time and introduce your products or services to them exclusively',
  },
  {
    icon: <WalletIcon />,
    title: 'Saving money and time',
    description:
      "With the help of chatbot, many of the messages and questions that your contacts have are answered, and you don't need to spend the whole day answering direct messages.",
  },

  {
    icon: <SatisfyIcon />,
    title: 'Satisfying customers',
    description:
      'Batino helps you respond to the requests of your contacts as quickly as possible. In fact, this will make your customers wait less and solve their problems quickly, and this will increase the satisfaction of your customers.',
  },
];

const Home: NextPage = () => {
  const getContent = (key: string) => {
    let list: { [k: string]: string } = landingContents;
    let text = list[key];
    return text;
  };
  const { isLoggedIn } = useSelector((state: AuthState) => ({
    isLoggedIn: state.auth.isLoggedIn,
  }));

  let { t } = useTranslation('common');
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
      <div className="landing-layout p-24">
        <div id="intro" className="gradient-card mb-5 p-16 ">
          <p className="dark">{getContent('landing-main-title')}</p>
          <p className="light">{getContent('landing-slogan')} </p>
          <p className="light d-block">{getContent('landing-description')} </p>
          <button className="primary mt-5 px-6 py-3">{t('online-demo')}</button>
          {/* <div className="iphone">
            <Image src={IphoneImg} alt="" />
          </div> */}
        </div>
        <div id="-cards" className="sections mt-8 ">
          <div>
            <p className="dark">{getContent('landing-section-2-title')}</p>
          </div>
          <div>
            <div className="my-5 flex justify-center space-x-10">
              {cards.map((item) => (
                <div key={item.title}>
                  <AdvantagesCard data={item} />
                </div>
              ))}
            </div>
          </div>
          <div
            id="support"
            className="blue-gradient-card flex justify-between mt-12"
          >
            <div className="flex-wrap">
              <p className="dark">{getContent('landing-help-title')}</p>
              <p className="light d-block">
                {getContent('landing-help-description')}{' '}
              </p>
            </div>
            <div className="flex flex-wrap">
              <ContactForm />
            </div>
          </div>
          <div
            id="pricing"
            className="sections selection:mt-12 flex justify-center items-center my-12"
          >
            <PricingPanels />
          </div>
        </div>
      </div>
    </LandingLayout>
  );
};

export default Home;
