import StartIcon from "../../../../../../../../assets/svg/icons/play.svg"

type StartNodeProps = {
  [x: string]: any;
};

const StartNode: React.FC<StartNodeProps> = (props) => {
  return <div className="icon">
    <StartIcon />
  </div>;
};

export default StartNode;
