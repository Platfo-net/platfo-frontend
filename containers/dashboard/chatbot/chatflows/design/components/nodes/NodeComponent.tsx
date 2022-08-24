import { useAppDispatch } from "hooks/reduxHooks";
import { ReactNode, useEffect, useState } from "react";
import { Node, NodeChildProps, NodeData, Port } from "reaflow";
import StartNode from "./components/StartNode";
import TextNode from "./components/TextNode";
import CrossIcon from "../../../../../../../assets/svg/icons/cross.svg";
import MenuNode from "./components/MenuNode";

const NodeComponent: React.FC = (props) => {
  const {
    properties,
    onClickPort,
    onNodeRemove,
    onEditTextNodeData,
    onEditMenuNodeData,
  } = props;

  const onClick = (
    event: React.MouseEvent<SVGGElement, MouseEvent>,
    node: NodeData
  ) => {
    console.log("Selecting Node", event, node);
  };

  useEffect(() => {}, [properties]);

  return (
    <>
      <Node
        className="node"
        onClick={onClick}
        port={
          <Port
            onClick={(e, portData) => onClickPort(e, portData, properties)}
            style={{
              fill: "#303030",
              stroke: "white",
              // transform: "translateX(-7.5px) translateY(7.5px) scale(1)",
            }}
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
              className={`${properties?.data?.type}-node-container node-container`}
              width={width}
              height={height}
            >
              <div className={`${properties?.data.type}-node`}>
                <div className={"node-actions-container"}>
                  {properties?.hasDeleteAction && (
                    <button
                      className={"icon-only sm m-1"}
                      onClick={() => onNodeRemove(properties)}
                    >
                      <CrossIcon />
                    </button>
                  )}
                </div>

                <div
                  className={`node-content-container ${properties?.data?.type}-content-container`}
                >
                  {properties?.data?.type === "start" && (
                    <StartNode {...nodeProps} />
                  )}
                  {properties?.data?.type === "text" && (
                    <TextNode
                      {...nodeProps}
                      onEditTextNodeData={onEditTextNodeData}
                    />
                  )}
                  {properties?.data?.type === "menu" && (
                    <MenuNode
                      {...nodeProps}
                      onEditMenuNodeData={onEditMenuNodeData}
                    />
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
