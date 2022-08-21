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
    title: t('about-title'),
    p1: t('about-p1'),
    p2: t('about-p2'),
    p3: t('about-p3'),
    address: t('about-address'),
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row mx-8">
      <div className="w-full md:w-1/2 p-5">
        <p className="dark font-extrabold">{about.title}</p>
        <p className="light">{about.p1}</p>
        <p className="light">{about.p2}</p>
        <p className="light">{about.p3}</p>
      </div>
      <div className="mapBox md:w-1/2 md:p-5 flex flex-col items-center justify-center">
        <p className="light"> {about.address}</p>
        <MapWithNoSSR />
      </div>
    </div>
  );
};

export default LandingFooter;
