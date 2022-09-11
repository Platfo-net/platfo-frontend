import {useEffect, useState} from "react";
import {Label, Node, NodeChildProps, NodeData, Port} from "reaflow";
import StartNode from "./components/StartNode";
import TextNode from "./components/TextNode";
import DeleteIcon from "../../../../../../../assets/svg/icons/trash.svg";
import EditIcon from "../../../../../../../assets/svg/icons/pencil.svg";
import MenuNode from "./components/MenuNode";
import { useChatflow, useDispatchChatflow } from "../../store/chatflow-context";
import chatflowTypes from "../../store/chatflowTypes";
import {checkNodeStatus, checkPortStatus, translateXYToCanvasPosition, updatePortStatus} from "../../utils/nodes";

const NodeComponent: React.FC = (props) => {
  const chatflowCtx = useChatflow();
  const { nodes, edges } = chatflowCtx;
  const dispatch = useDispatchChatflow();
  const [nodeStatus, setNodeStatus] = useState("NORMAL");
  const [westPortStatus, setWestPortStatus] = useState("NORMAL");

  const { properties } = props;

  const onClick = (
    event: React.MouseEvent<SVGGElement, MouseEvent>,
    node: NodeData
  ) => {
    console.log("Selecting Node", event, node);
  };

  const onNodeRemove = (nodeData) => {
    const updateNodes = nodes.filter((item) => item.id !== nodeData.id);
    dispatch({
      type: chatflowTypes.CHANGE_NODE,
      payload: updateNodes,
    });

    let updateEdges = edges.filter((item) => item.to !== nodeData.id);
     updateEdges = updateEdges.filter((item) => item.from !== nodeData.id);
    dispatch({
      type: chatflowTypes.CHANGE_EDGE,
      payload: updateEdges,
    });
  };

  const onClickPort = (event, portData, nodeData) => {
    const [x, y] = translateXYToCanvasPosition(event?.clientX, event.clientY);
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

  const onEditNode = (nodeData) => {
    dispatch({
      type: chatflowTypes.SHOW_DRAWER,
      payload: true
    })

    dispatch({
      type: chatflowTypes.DRAWER_DATA,
      payload: nodeData
    })
  }
  
  useEffect(() => {
    if(properties.data.type !== "START" ) {
      const status = checkNodeStatus(properties, edges);
      setNodeStatus(status)
    }
    if(properties.data.type !== "MENU" ) {
      const portStatus = checkPortStatus(properties, edges);
      setWestPortStatus(portStatus)
    }
  }, [properties]);

  useEffect(() => {
    console.log('westPortStatus')
    console.log(westPortStatus)
    const updateNodes = updatePortStatus(nodes, properties, westPortStatus);
    dispatch({
      type: chatflowTypes.CHANGE_NODE,
      payload: updateNodes,
    });
  }, [westPortStatus]);

  return (
    <>
      <Node
        className={`node ${nodeStatus === "ERROR" ? "node-error" : ""}`}
        onClick={onClick}
        port={
          <Port
            onClick={(e, portData) => onClickPort(e, portData, properties)}
            rx={10}
            ry={10}
          />
        }
        label={<Label className="node-label" />}
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
            >
              <div className={`${properties?.data.type}-node`}>
                <div className={`node-actions-container `}>
                  <div className="flex mx-2">
                    {properties?.hasDeleteAction && (
                      <button onClick={() => onNodeRemove(properties)}>
                        <DeleteIcon />
                      </button>
                    )}
                    {properties?.hasEditAction && (
                      <button onClick={() => onEditNode(properties)}>
                        <EditIcon />
                      </button>
                    )}
                  </div>
                </div>
                <div
                  className={`node-content-container ${properties?.data?.type}-content-container`}
                >
                  {properties?.data?.type === "START" && (
                    <StartNode {...nodeProps} />
                  )}
                  {properties?.data?.type === "TEXT" && (
                    <TextNode {...nodeProps} />
                  )}
                  {properties?.data?.type === "MENU" && (
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
