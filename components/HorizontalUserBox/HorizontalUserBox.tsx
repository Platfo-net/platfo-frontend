import Avatar from "components/Avatar/Avatar";

type HorizontalUserBoxProps = {};

const HorizontalUserBox: React.FC<HorizontalUserBoxProps> = ({
  imageUrl,
  title,
  subTitle,
  className,
  onClick,
  id,
}) => {
  return (
    <button
      className={`${className} horizontal-user-box flex flex-row justify-content-between my-2`}
      onClick={() => onClick(id)}
    >
      <div className="avatar-container  justify-center flex p-1 ">
        {imageUrl && <Avatar imageUrl={imageUrl} />}
      </div>
      <div className="flex flex-col rtl:text-right ltr:text-left">
        <p className="title">{title} </p>
        <span className="subtitle">{subTitle} </span>
      </div>
    </button>
  );
};

export default HorizontalUserBox;
