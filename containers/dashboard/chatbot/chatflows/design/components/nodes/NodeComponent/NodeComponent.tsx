import { useAppDispatch } from "hooks/reduxHooks";
import { ReactNode, useEffect } from "react";
import { Node, NodeChildProps, NodeData, NodeProps } from "reaflow";
import StartNode from "../components/StartNode";

const NodeComponent: React.FC<NodeProps> = (props) => {
  const { properties } = props;
  const { data } = properties;
  const onClick = (
    event: React.MouseEvent<SVGGElement, MouseEvent>,
    node: NodeData
  ) => {
    console.log("Selecting Node", event, node);
  };

  useEffect(() => {}, []);

  return (
    <Node className="node" onClick={onClick} {...props}>
      {(nodeProps: NodeChildProps) => {
        const { width, height } = nodeProps;
        console.log(nodeProps);
        return (
          <foreignObject
            id={`node-foreignObject-${properties.id}`} // Used during drag & drop of edges to resolve the destination node ("toNode")
            className={`${data.type}-node-container node-container`}
            width={width}
            height={height}
            // x={0} // Relative position from the parent Node component (aligned to top)
            // y={0} // Relative position from the parent Node component (aligned to left)
            // onClick={onNodeClick as MouseEventHandler}
            // onMouseEnter={onNodeEnter as MouseEventHandler}
            // onMouseLeave={onNodeLeave as MouseEventHandler}
            // onKeyDown={onKeyDown as KeyboardEventHandler}
          >
            <div className={`${data.type}-node`}>
              <div className={"node-actions-container"}>
                {data.hasDeleteAction && (
                  <div
                    className={"delete-action"}
                    // onClick={onNodeRemove as MouseEventHandler}
                  >
                    delete
                  </div>
                )}
              </div>

              <div
                className={`node-content-container ${data.type}-content-container`}
              >
                {data.type === "start" && <StartNode {...nodeProps} />}
              </div>
            </div>
          </foreignObject>
        );
      }}
    </Node>
  );
};

export default NodeComponent;
