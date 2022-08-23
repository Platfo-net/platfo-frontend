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
import NodeComponent from "./components/nodes/NodeComponent/NodeComponent";
import { createStartNodeData } from "./utils/nodes";

type ChatFlowDesignProps = {};

const ChatFlowDesign: React.FC<ChatFlowDesignProps> = () => {
  const ref = useRef<CanvasRef | null>(null);
  const [edgesData, setEdgesData] = useState<any[]>([]);
  const [nodesData, setNodesData] = useState<any[]>([]);
  const nodes = [
    {
      id: "1",
      text: "1",
    },
    {
      id: "2",
      text: "2",
    },
  ];
  const onNodeLinkCheck = (event, from: NodeData, to: NodeData) => {
    return !hasLink(edgesData, from, to);
  };

  const onNodeLink = (event, from, to) => {
    console.log("edges");
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

  const Node = (nodeProps: NodeProps) => {
    return <NodeComponent {...nodeProps} />;
  };

  const Edge = (edgeProps: EdgeProps) => {
    return <EdgeComponent {...edgeProps} />;
  };

  const onLayoutChange = (values) => {
    console.log("onLayoutChange");
    // TODO CHACK WHEN UPDATE
  };

  useEffect(() => {
    console.log(nodesData);
    const startNode = nodesData?.find((node) => node?.data?.type === "start");
    if (!startNode) {
      const startData = createStartNodeData();
      setNodesData([...nodesData, startData]);
    }
  }, [nodesData]);

  return (
    <div className="playground">
      <Canvas
        className="canvas"
        ref={ref}
        direction="LEFT"
        maxWidth={10000} // 10k should handle about 50 horizontal nodes
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
      />
    </div>
  );
};

export default ChatFlowDesign;
