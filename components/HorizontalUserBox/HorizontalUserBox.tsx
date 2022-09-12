import Avatar from "components/Avatar/Avatar";

type HorizontalUserBoxProps = {};

const HorizontalUserBox: React.FC<HorizontalUserBoxProps> = ({
  className,
  onClick,
  item,
    active
}) => {

  const onButtonClick = (item) => {
    if (active) {
      return () => {};
    }

    return onClick(item);
  };

  return (
    <button
      className={`${className} ${active ? "active" : ""}  horizontal-user-box flex rtl:flex-row ltr:flex-row-reverse my-2 flex-wrap justify-between overflow-clip `}
      onClick={() => onButtonClick(item)}
    >
      <div className="flex flex-col text-left p-2 m-t1 w-2/3">
        <b className="title m-0">{item.information?.username} </b>
        <span className="text-gray-400 text-sm font-light whitespace-nowrap text-ellipsis overflow-hidden">{item?.last_message?.message} </span>
      </div>
      <div className="avatar-container w-1/3 ">
        {item.information?.profile_image && (
            <div className="w-16   ">
          <Avatar imageUrl={item.information?.profile_image} />
            </div>
        )}
      </div>
    </button>
  );
};

export default HorizontalUserBox;
