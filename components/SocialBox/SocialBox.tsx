import Avatar from "components/Avatar/Avatar";

type SocialBoxProps = {};

const SocialBox: React.FC<SocialBoxProps> = ({
  imageUrl,
  onClick,
  title,
  buttonText,
  id,
}) => {
  return (
    <div className="social-box flex-col justify-center text-center p-5">
      <div className="avatar-container  justify-center flex p-1 ">
        <Avatar imageUrl={imageUrl} />
      </div>

      <p className="py-5">{title} </p>
      <button className="primary w-full" onClick={() => onClick(id)}>
        {buttonText}
      </button>
    </div>
  );
};

export default SocialBox;
