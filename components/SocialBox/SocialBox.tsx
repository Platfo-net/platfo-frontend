import Avatar from "components/Avatar/Avatar";
import useTranslation from "next-translate/useTranslation";
import PlusIcon from "../../assets/svg/icons/plus.svg";
import CrossIcon from "../../assets/svg/icons/cross.svg";

type SocialBoxProps = {};

const SocialBox: React.FC<SocialBoxProps> = ({
  onClick,
  title,
  buttonText,
  empty,
  data,
  imageUrlKey,
  titleKey,
  removeable,
  onClickRemove,
}) => {
  let { t } = useTranslation("common");

  return (
    <div className="basis-1/6 m-4">
      {!empty ? (
        <div className="social-box flex-col justify-center text-center">
          <div className="avatar-container  justify-center flex p-1 ">
            {data[imageUrlKey] && <Avatar imageUrl={data[imageUrlKey]} />}
          </div>
          {removeable && (
            <div className="remove-btn">
              <button className="icon-only" onClick={() => onClickRemove(data)}>
                <CrossIcon />
              </button>
            </div>
          )}

          {data.platform && (
            <div className="platform-container ">
              <Avatar iconKey={data.platform} />{" "}
            </div>
          )}
          <p>{data[titleKey]} </p>
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
