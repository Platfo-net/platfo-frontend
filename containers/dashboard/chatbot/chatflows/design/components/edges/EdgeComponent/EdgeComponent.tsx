import { Edge, EdgeData, EdgeProps } from "reaflow";

const EdgeComponent: React.FC<EdgeProps> = (props) => {

  const onClick = (
    event: React.MouseEvent<SVGGElement, MouseEvent>,
    edge: EdgeData
  ) => {
    console.log("Selecting edge", event, edge);
  };



  return <Edge className="edge" onClick={onClick} {...props} />;
};

export default EdgeComponent;
