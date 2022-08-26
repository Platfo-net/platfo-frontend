import Avatar from "components/Avatar/Avatar";

type HorizontalUserBoxProps = {};

const HorizontalUserBox: React.FC<HorizontalUserBoxProps> = ({
  className,
  onClick,
  item,
}) => {
  return (
    <button
      className={`${className} horizontal-user-box flex flex-row my-2`}
      onClick={() => onClick(item)}
    >
      <div className="flex flex-col text-left">
        <p className="title m-auto">{item.information?.username} </p>
        <span className="subtitle">{item?.last_message?.message} </span>
      </div>
      <div className="avatar-container  justify-center flex p-1 ">
        {item.information?.profile_image && (
          <Avatar imageUrl={item.information?.profile_image} />
        )}
      </div>
    </button>
  );
};

export default HorizontalUserBox;
