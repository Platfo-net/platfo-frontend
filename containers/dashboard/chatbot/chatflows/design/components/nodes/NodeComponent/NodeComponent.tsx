import { useAppDispatch } from "hooks/reduxHooks";
import { Node, NodeData, NodeProps } from "reaflow";
import { changeSelections } from "stores/actions";

const NodeComponent: React.FC<NodeProps> = (props) => {
  const dispatch = useAppDispatch();

  const onClick = (
    event: React.MouseEvent<SVGGElement, MouseEvent>,
    node: NodeData
  ) => {
    console.log("Selecting Node", event, node);
    // dispatch(changeSelections([node.id]));
  };

  return <Node className="node" onClick={onClick} {...props} />;
};

export default NodeComponent;
