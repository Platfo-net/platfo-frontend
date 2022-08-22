import Map from 'components/Map/Map';
import dynamic from 'next/dynamic';
import landingContents from 'assets/contents/landingContents.json';
import useTranslation from 'next-translate/useTranslation';
type LandingFooterProps = {};

const LandingFooter: React.FC<LandingFooterProps> = () => {
  let { t } = useTranslation('common');

  const MapWithNoSSR = dynamic(() => import('../../../components/Map/Map'), {
    ssr: false,
  });

  const getContent = (key: string) => {
    let list: { [k: string]: string } = landingContents;
    let text = list[key];
    return text;
  };

  const about = {
    title: t('landing-about-title'),
    p1: t('landing-about-pragraph-1'),
    p2: t('landing-about-pragraph-2'),
    p3: t('landing-about-pragraph-3'),
    address: t('landing-about-address'),
  };

  return (
    <div id="footer" className="w-full flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 p-5">
        <p className="title font-extrabold text-2xl">{about.title}</p>
        <p>{about.p1}</p>
        <p>{about.p2}</p>
        <p>{about.p3}</p>
      </div>
      <div className="mapBox md:w-1/2 md:p-5 flex flex-col">
        <p> {about.address}</p>
        <MapWithNoSSR />
      </div>
    </div>
  );
};

export default LandingFooter;
