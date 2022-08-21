import useTranslation from 'next-translate/useTranslation';
type AdvantagesCardProps = {
  data: {
    title: string;
    icon: any;
    description: string;
  };
};

const AdvantagesCard: React.FC<AdvantagesCardProps> = ({ data }) => {
  let { t } = useTranslation('common');
  return (
    <div className="flex justify-center">
      <div className="advantagesCard w-3/5 flex flex-col">
        <div className="icon mb-12">{data.icon}</div>
        <div>
          <p className="title">{t(data.title)} </p>
        </div>
        <div>
          <p className="description">{t(data.description)} </p>
        </div>
      </div>
    </div>
  );
};

export default AdvantagesCard;
