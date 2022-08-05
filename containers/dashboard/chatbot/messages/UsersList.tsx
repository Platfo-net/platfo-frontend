import HorizontalUserBox from "components/HorizontalUserBox/HorizontalUserBox";
import Input from "components/Input/Input";
import useTranslation from "next-translate/useTranslation";
import Img from "../../../../assets/img/p.png";
type UsersListProps = {};

const UsersList: React.FC<UsersListProps> = () => {
  let { t } = useTranslation("common");
  return (
    <div className="flex flex-col">
      <Input placeholder={t("search")} />
      <HorizontalUserBox
        imageUrl={Img}
        title="User name"
        subTitle="hello, sir"
      />
      <HorizontalUserBox
        imageUrl={Img}
        title="User name"
        subTitle="hello, sir"
      />
      <HorizontalUserBox
        imageUrl={Img}
        title="User name"
        subTitle="hello, sir"
      />
      <HorizontalUserBox
        imageUrl={Img}
        title="User name"
        subTitle="hello, sir"
      />
      <HorizontalUserBox
        imageUrl={Img}
        title="User name"
        subTitle="hello, sir"
      />{" "}
      <HorizontalUserBox
        imageUrl={Img}
        title="User name"
        subTitle="hello, sir"
      />{" "}
      <HorizontalUserBox
        imageUrl={Img}
        title="User name"
        subTitle="hello, sir"
      />{" "}
    </div>
  );
};

export default UsersList;
