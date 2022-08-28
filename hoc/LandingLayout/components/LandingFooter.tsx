import Map from 'components/Map/Map';
import dynamic from 'next/dynamic';
import useTranslation from 'next-translate/useTranslation';
import LocationIcon from '../../../assets/svg/location.svg';
import PhoneCall from '../../../assets/svg/phone-call.svg';
import Mail from '../../../assets/svg/mail.svg';

type LandingFooterProps = {};

const LandingFooter: React.FC<LandingFooterProps> = () => {
  let { t } = useTranslation('common');

  const MapWithNoSSR = dynamic(() => import('../../../components/Map/Map'), {
    ssr: false,
  });

  return (
    <div id="footer" className="w-full flex flex-col md:flex-row">
      <div className="about-box w-full md:w-1/2 p-5">
        <p className="title font-extrabold text-2xl">
          {t('landing-footer-title')}
        </p>
        <p>{t('landing-footer-description')}</p>
        <p className="font-extrabold">{t('landing-name-of-business')}</p>
        <div className="business-info space-y-5">
          <div className="location-info flex item">
            <LocationIcon />
            <p className="my-0 mx-2 text-sm">{t('landing-footer-address')}</p>
          </div>

          <div className="call-info flex items-center">
            <PhoneCall />
            <p className="my-0 mx-2 text-sm"> {t('landing-business-phone')}</p>
          </div>

          <div className="mail-info flex items-center">
            <Mail />
            <p className="my-0 mx-2 text-sm"> {t('landing-business-mail')}</p>
          </div>
        </div>
      </div>
      <div className="map-box md:w-1/2 md:p-8 flex flex-col">
        <MapWithNoSSR />
      </div>
    </div>
  );
};

export default LandingFooter;
