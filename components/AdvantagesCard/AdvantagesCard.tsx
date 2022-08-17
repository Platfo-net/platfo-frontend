type AdvantagesCardProps = {
  data: {
    title: string;
    icon: any;
    description: string;
  };
};

const AdvantagesCard: React.FC<AdvantagesCardProps> = ({ data }) => {
  return (
    <div className="advantagesCard p-8">
      <div className="icon mb-12">{data.icon}</div>
      <div>
        <p className="title">{data.title} </p>
      </div>
      <div>
        <p className="description">{data.description} </p>
      </div>
    </div>
  );
};

export default AdvantagesCard;
