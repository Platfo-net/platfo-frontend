import Avatar from "components/Avatar/Avatar";
import useTranslation from "next-translate/useTranslation";
import PlusIcon from "../../assets/svg/icons/plus.svg";
import CrossIcon from "../../assets/svg/icons/cross.svg";
import AlertModal from "../AlertModal/AlertModal";
import {useState} from "react";

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
  descriptionKey,
  iconKey,
  className,

}) => {
  const [openModal,  setOpenModal] = useState(false);
  const {t} = useTranslation("common");
   const handleAlertModal = () => setOpenModal(!openModal)

  return (
    <div className={`basis - 1 / 6 m-4 `}>
      {!empty ? (
        <div
          className={`social-box flex-col justify-center text-center ${className}`}
        >
          {!iconKey ? (
            <div className="avatar-container  justify-center flex p-1 ">
              {data[imageUrlKey] && <Avatar imageUrl={data[imageUrlKey]} />}
            </div>
          ) : (
            <div className="avatar-container  justify-center flex p-1 ">
              <Avatar iconKey={iconKey} />
            </div>
          )}

          {removeable && (
            <>
              <div className="remove-btn">
                <button
                  className="icon-only"
                  onClick={() => setOpenModal(true)}
                >
                  <CrossIcon />
                </button>
              </div>
              <AlertModal
                text={t("are-you-sure-to-delete")}
                onCancel={handleAlertModal}
                onOK={async () => {
                  await onClickRemove(data);
                  handleAlertModal();
                }}
                open={openModal}
              />
            </>
          )}

          {data.platform && (
            <div className="platform-container ltr:left-8">
              <Avatar iconKey={data.platform} />{" "}
            </div>
          )}
          <p>{data[titleKey]} </p>
          {descriptionKey && (
            <p className="subtitle"> {data[descriptionKey]} </p>
          )}
          {onClick && (
            <button
              className="secondary w-full mt-3"
              onClick={() => onClick(data)}
            >
              {buttonText}
            </button>
          )}
        </div>
      ) : (
        <button
          className={`social-box empty flex-col justify-center text-center p-5 ${className}`}
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
