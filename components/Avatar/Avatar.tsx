import InstaIcon from "../../assets/svg/icons/instagram.svg";
import BotBuilderIcon from "../../assets/svg/icons/comment-code.svg";
import ErrorImage from "../../assets/img/botinow_g.png";

/* eslint-disable @next/next/no-img-element */
type AvatarProps = {};

const Avatar: React.FC<AvatarProps> = ({ imageUrl, iconKey, className }) => {
  const icons = {
    instagram: <InstaIcon />,
    BOT_BUILDER: <BotBuilderIcon />,
  };

  return (
    <>
      {imageUrl && (
        <img
          className={`avatar image inline-block rounded-full ring-2 ring-white w-full h-full ${className}`}
          src={imageUrl}
          alt=""
          width={"100%"}
          height={"100%"}
        />
      )}
      {iconKey && (
        <div className={`avatar icon ${iconKey}`}>{icons[iconKey]}</div>
      )}
    </>
  );
};

export default Avatar;
