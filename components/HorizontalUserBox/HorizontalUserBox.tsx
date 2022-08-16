import Avatar from "components/Avatar/Avatar";

type HorizontalUserBoxProps = {};

const HorizontalUserBox: React.FC<HorizontalUserBoxProps> = ({
  className,
  onClick,
  item,
}) => {
  return (
    <button
      className={`${className} horizontal-user-box flex flex-row justify-content-between my-2`}
      onClick={() => onClick(item)}
    >
      <div className="avatar-container  justify-center flex p-1 ">
        {item.information?.profile_image && (
          <Avatar imageUrl={item.information?.profile_image} />
        )}
      </div>
      <div className="flex flex-col rtl:text-right ltr:text-left">
        <p className="title m-auto">{item.information?.username} </p>
        {/* <span className="subtitle">{subTitle} </span> */}
      </div>
    </button>
  );
};

export default HorizontalUserBox;
