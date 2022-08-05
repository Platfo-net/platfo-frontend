import Avatar from "components/Avatar/Avatar";
import Img from "../../../../assets/img/p.png";

type UserInfoProps = {};

const UserInfo: React.FC<UserInfoProps> = () => {
  return (
    <div className={`user-info card h-full flex flex-col`}>
      <div className="w-3/4 mx-auto">
        <Avatar imageUrl={Img} />
      </div>
      <div className="w-Full text-center">
        <h3> User Name </h3>
      </div>
    </div>
  );
};

export default UserInfo;
