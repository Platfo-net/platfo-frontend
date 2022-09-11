import {FC} from "react";
import Nav from "./components/Nav";
import Tools from "./components/Tools";
import Logo from "./components/Logo";

const DashboardSideDrawer: FC = () => {

  return (
    <>
      <aside className={` side-drawer  sm:flex sm:flex-col z-50`}>
        <div className="flex-grow flex flex-col justify-between ">
          <Logo href=""/>
          <Nav />
          <Tools />
        </div>
      </aside>
    </>
  );
};

export default DashboardSideDrawer;
