import MenuIcon from "../../../../../../../../assets/svg/icons/apps-add.svg";

type MenuNodeProps = {
  [x: string]: any;
};

const MenuNode: React.FC<MenuNodeProps> = (props) => {
  return (
      <div className="icon">
        <MenuIcon />
      </div>
  );
};

export default MenuNode;
