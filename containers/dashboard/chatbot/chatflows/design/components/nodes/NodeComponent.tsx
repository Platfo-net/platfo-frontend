import {useEffect, useState} from "react";
import { Node, NodeChildProps, NodeData, Port } from "reaflow";
import StartNode from "./components/StartNode";
import TextNode from "./components/TextNode";
import DeleteIcon from "../../../../../../../assets/svg/icons/trash.svg";
import EditIcon from "../../../../../../../assets/svg/icons/pencil.svg";
import MenuNode from "./components/MenuNode";
import { useChatflow, useDispatchChatflow } from "../../store/chatflow-context";
import chatflowTypes from "../../store/chatflowTypes";
import { translateXYToCanvasPosition } from "../../utils/nodes";

const NodeComponent: React.FC = (props) => {
  const chatflowCtx = useChatflow();
  const { nodes, edges } = chatflowCtx;
  const dispatch = useDispatchChatflow();

  const { properties } = props;

  const [showActions, setShowActions] = useState(false);

  const onClick = (
    event: React.MouseEvent<SVGGElement, MouseEvent>,
    node: NodeData
  ) => {
    console.log("Selecting Node", event, node);
  };

  const onEnter = (
    event: React.MouseEvent<SVGGElement, MouseEvent>,
    node: NodeData
  ) => {
    console.log("onEnter Node", event, node);
    // setShowActions(true);
  };
  const onLeave = (
    event: React.MouseEvent<SVGGElement, MouseEvent>,
    node: NodeData
  ) => {
    console.log("onLeave Node", event, node);
    // setShowActions(false);
  };
  const onMouseOver = (event: React.MouseEvent<SVGGElement, MouseEvent>) => {
    console.log("onMouseOver Node",);
    setShowActions(true);
  };

  const onMouseOut = (event: React.MouseEvent<SVGGElement, MouseEvent>) => {
    console.log("onMouseLeave Node",);
    setShowActions(false);
  };

  const onNodeRemove = (nodeData) => {
    const updateNodes = nodes.filter((item) => item.id !== nodeData.id);
    dispatch({
      type: chatflowTypes.CHANGE_NODE,
      payload: updateNodes,
    });

    const updateEdges = edges.filter((item) => item.to !== nodeData.id);
    dispatch({
      type: chatflowTypes.CHANGE_EDGE,
      payload: updateEdges,
    });
  };

  const onClickPort = (event, portData, nodeData) => {
    const [x, y] = translateXYToCanvasPosition(event?.clientX, event.clientY, {
      top: 60,
      left: 15,
    });
    dispatch({
      type: chatflowTypes.SHOW_POPUP_MENU,
      payload: true,
    });
    dispatch({
      type: chatflowTypes.POPUP_POSITION,
      payload: [x, y],
    });
    dispatch({
      type: chatflowTypes.SELECTED_PORT,
      payload: portData,
    });
    dispatch({
      type: chatflowTypes.SELECTED_NODE,
      payload: nodeData,
    });
  };

  useEffect(() => {}, [properties]);

  return (
    <>
      <Node
        className="node"
        onClick={onClick}
        onEnter={onEnter}
        onLeave={onLeave}
        port={
          <Port
            onClick={(e, portData) => onClickPort(e, portData, properties)}
            rx={10}
            ry={10}
          />
        }
        {...props}
      >
        {(nodeProps: NodeChildProps) => {
          const { width, height } = nodeProps;
          return (
            <foreignObject
              id={`node-foreignObject-${properties.id}`}
              className={`${properties?.data?.type}-node-container node-container overflow-visible`}
              width={width}
              height={height}
              onMouseEnter={onMouseOver}
              onMouseLeave={onMouseOut}
            >
              <div className={`${properties?.data.type}-node`}>
                <div className={`node-actions-container ${showActions ? " " : "hidden"}`}>
                  <div className="flex mx-2">
                    {properties?.hasDeleteAction && (
                      <button onClick={() => onNodeRemove(properties)}>
                        <DeleteIcon />
                      </button>
                    )}
                    {properties?.hasEditAction && (
                      <button onClick={() => onNodeRemove(properties)}>
                        <EditIcon />
                      </button>
                    )}
                  </div>
                </div>

                <div
                  className={`node-content-container ${properties?.data?.type}-content-container`}
                >
                  {properties?.data?.type === "start" && (
                    <StartNode {...nodeProps} />
                  )}
                  {properties?.data?.type === "text" && (
                    <TextNode {...nodeProps} />
                  )}
                  {properties?.data?.type === "menu" && (
                    <MenuNode {...nodeProps} />
                  )}
                </div>
              </div>
            </foreignObject>
          );
        }}
      </Node>
    </>
  );
};

export default NodeComponent;
