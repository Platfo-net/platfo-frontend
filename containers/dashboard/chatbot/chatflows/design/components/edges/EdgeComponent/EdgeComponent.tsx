import { useAppDispatch } from "hooks/reduxHooks";
import { Edge, EdgeData, EdgeProps } from "reaflow";
import { changeSelections } from "stores/actions";

const EdgeComponent: React.FC<EdgeProps> = (props) => {
  const dispatch = useAppDispatch();

  const onClick = (
    event: React.MouseEvent<SVGGElement, MouseEvent>,
    edge: EdgeData
  ) => {
    console.log("Selecting edge", event, edge);
    // dispatch(changeSelections([edge.id]));
  };

  return <Edge className="edge" onClick={onClick} {...props} />;
};

export default EdgeComponent;
