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
}) => {
  let { t } = useTranslation("common");

  return (
    <div className="basis-1/6 m-4">
      {!empty ? (
        <div className="social-box flex-col justify-center text-center p-5">
          <div className="avatar-container  justify-center flex p-1 ">
            {imageUrl && <Avatar imageUrl={imageUrl} />}
            {icon && <Avatar icon={icon} className={id} />}
          </div>

          <p className="py-5">{title} </p>
          <button className="primary w-full" onClick={() => onClick(id)}>
            {buttonText}
          </button>
        </div>
      ) : (
        <button
          className="social-box empty flex-col justify-center text-center p-5"
          onClick={onClick}
        >
          <div className="icon">
            <PlusIcon />
          </div>
          <span>{t("add-new-account")}</span>
        </button>
      )}
    </div>
  );
};

export default SocialBox;
