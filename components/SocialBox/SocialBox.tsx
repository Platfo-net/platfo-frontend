import Avatar from "components/Avatar/Avatar";
import useTranslation from "next-translate/useTranslation";
import PlusIcon from "../../assets/svg/icons/plus.svg";

type SocialBoxProps = {};

const SocialBox: React.FC<SocialBoxProps> = ({
  imageUrl,
  onClick,
  title,
  buttonText,
  id,
  icon,
  empty,
  data,
  imageUrlKey,
  titleKey,
}) => {
  let { t } = useTranslation("common");

  return (
    <div className="basis-1/6 m-4">
      {!empty ? (
        <div className="social-box flex-col justify-center text-center">
          <div className="avatar-container  justify-center flex p-1 ">
            {data[imageUrlKey] && <Avatar imageUrl={data[imageUrlKey]} />}
          </div>
          {data.platform && (
            <div className="platform-container ">
              <Avatar iconKey={data.platform} />{" "}
            </div>
          )}
          <p className="pt-4 pb-2">{data[titleKey]} </p>
          <button className="secondary w-full" onClick={() => onClick(data)}>
            {buttonText}
          </button>
        </div>
      ) : (
        <button
          className="social-box empty flex-col justify-center text-center p-5"
          onClick={onClick}
        >
          <div className="content">
            <div className="icon">
              <PlusIcon />
            </div>
            <span>{title}</span>
          </div>
        </button>
      )}
    </div>
  );
};

export default SocialBox;
