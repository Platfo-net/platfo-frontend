import { useEffect, useRef, useState } from "react";
import {
  Canvas,
  CanvasRef,
  EdgeData,
  EdgeProps,
  hasLink,
  NodeData,
  NodeProps,
} from "reaflow";
import EdgeComponent from "./components/edges/EdgeComponent/EdgeComponent";
import PopupMenu from "./components/nodes/components/PopupMenu";
import NodeComponent from "./components/nodes/NodeComponent";
import {
  createDefaultMenuNodeData,
  createDefaultTextNodeData,
  createStartNodeData,
  translateXYToCanvasPosition,
} from "./utils/nodes";
import { v4 as uuidv4 } from "uuid";

type ChatFlowDesignProps = {};

const ChatFlowDesign: React.FC<ChatFlowDesignProps> = () => {
  const ref = useRef<CanvasRef | null>(null);
  const [edgesData, setEdgesData] = useState<any[]>([]);
  const [nodesData, setNodesData] = useState<any[]>([]);
  const [popupMenu, setPopupMenu] = useState(false);
  const [selectedPort, setSelectedPort] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);
  const [popupPositon, setPopupPosition] = useState([0, 0]);

  const Node = (nodeProps: NodeProps) => {
    return (
      <NodeComponent
        {...nodeProps}
        onClickPort={onClickPort}
        onNodeRemove={onNodeRemove}
        onEditTextNodeData={onEditTextNodeData}
        onEditMenuNodeData={onEditMenuNodeData}
      />
    );
  };

  const Edge = (edgeProps: EdgeProps) => {
    return <EdgeComponent {...edgeProps} />;
  };

  const onNodeRemove = (nodeData) => {
    const updateNodes = nodesData.filter((item) => item.id !== nodeData.id);
    setNodesData(updateNodes);

    const updateEdges = edgesData.filter((item) => item.to !== nodeData.id);
    setEdgesData(updateEdges);
  };

  const onEditTextNodeData = (value, nodeData) => {
    const updateNodes = nodesData.map((item) => {
      if (item.id === nodeData.id) {
        return {
          ...item,
          data: {
            ...item.data,
            value: value,
          },
        };
      } else {
        return {
          ...item,
        };
      }
    });
    setNodesData(updateNodes);
  };

  const onEditMenuNodeData = (value, height, nodeData) => {
    const updateNodes = nodesData.map((item) => {
      if (item.id === nodeData.id) {
        return {
          ...item,
          height,
          data: value,
        };
      } else {
        return {
          ...item,
        };
      }
    });
    setNodesData(updateNodes);
  };

  const onNodeLinkCheck = (event, from: NodeData, to: NodeData) => {
    return !hasLink(edgesData, from, to);
  };

  const onNodeLink = (event, from, to) => {
    const id = `${from.id}-${to.id}`;
    const newEdges = [
      ...edgesData,
      {
        id,
        from: from.id,
        to: to.id,
      },
    ];
    setEdgesData(newEdges);
  };

  const onClickPort = (event, portData, nodeData) => {
    const [x, y] = translateXYToCanvasPosition(event?.clientX, event.clientY, {
      top: 60,
      left: 15,
    });

    setPopupMenu(true);
    setPopupPosition([x, y]);
    setSelectedPort(portData);
    setSelectedNode(nodeData);
    console.log(nodeData);
  };

  const onCanvasClick = () => {
    setPopupMenu(false);
    setSelectedPort(null);
    setSelectedNode(null);
  };

  const onLayoutChange = (values) => {
    console.log("onLayoutChange");
    // TODO CHACK WHEN UPDATE
  };

  const onClickAddTextBlock = async () => {
    setPopupMenu(false);
    const textData = await createDefaultTextNodeData();
    setNodesData([...nodesData, textData]);

    const toPort = await textData.ports.find((item) => item.side === "EAST");
    const id = uuidv4();
    const newEdges = [
      ...edgesData,
      {
        id,
        from: selectedNode.id,
        to: textData.id,
        fromPort: selectedPort.id,
        toPort: toPort.id,
      },
    ];
    setEdgesData(newEdges);
  };

  const onClickAddMenuBlock = async () => {
    setPopupMenu(false);
    const textData = await createDefaultMenuNodeData();
    setNodesData([...nodesData, textData]);

    const toPort = await textData.ports.find((item) => item.side === "EAST");
    const id = uuidv4();
    const newEdges = [
      ...edgesData,
      {
        id,
        from: selectedNode.id,
        to: textData.id,
        fromPort: selectedPort.id,
        toPort: toPort.id,
      },
    ];
    setEdgesData(newEdges);
  };

  useEffect(() => {
    console.log("nodeData ", nodesData);
    const startNode = nodesData?.find((node) => node?.data?.type === "start");
    if (!startNode) {
      const startData = createStartNodeData();
      setNodesData([...nodesData, startData]);
    }
  }, [nodesData]);

  useEffect(() => {
    console.log("edgesData ", edgesData);
  }, [edgesData]);

  return (
    <>
      <div className="playground">
        <Canvas
          arrow={null}
          className="canvas"
          ref={ref}
          direction="LEFT"
          maxWidth={10000}
          maxHeight={2000}
          nodes={nodesData}
          edges={edgesData}
          // selections={selections}
          onNodeLinkCheck={onNodeLinkCheck}
          onNodeLink={onNodeLink}
          node={Node}
          edge={Edge}
          onLayoutChange={onLayoutChange}
          layoutOptions={{
            "elk.algorithm": "layered",
          }}
          onCanvasClick={onCanvasClick}
        />
      </div>
      <PopupMenu
        position={popupPositon}
        open={popupMenu}
        onClickAddTextBlock={onClickAddTextBlock}
        onClickAddMenuBlock={onClickAddMenuBlock}
      />
    </>
  );
};

export default ChatFlowDesign;
