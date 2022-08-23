import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Canvas,
  CanvasRef,
  EdgeData,
  EdgeProps,
  hasLink,
  NodeData,
  NodeProps,
} from "reaflow";
import { changeEdges } from "stores/actions";
import actionTypes from "stores/actionTypes";
import EdgeComponent from "./components/edges/EdgeComponent/EdgeComponent";
import NodeComponent from "./components/nodes/NodeComponent/NodeComponent";

type ChatFlowDesignProps = {};

const ChatFlowDesign: React.FC<ChatFlowDesignProps> = () => {
  /* const { nodes, edges, selections } = useAppSelector((state) => ({
    nodes: state.chatflow.nodes,
    edges: state.chatflow.edges,
    selections: state.chatflow.selections,
  })); */
  const dispatch = useDispatch();
  const ref = useRef<CanvasRef | null>(null);
  const [ed, setEd] = useState([]);
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
    return !hasLink(ed, from, to);
  };

  const onNodeLink = (event, from, to) => {
    console.log("onnode");
    const id = `${from.id}-${to.id}`;
    const newEdges = [
      ...ed,
      {
        id,
        from: from.id,
        to: to.id,
      },
    ];
    setEd(newEdges);
  };

  const Node = (nodeProps: NodeProps) => {
    return <NodeComponent {...nodeProps} />;
  };

  const Edge = (edgeProps: EdgeProps) => {
    return <EdgeComponent {...edgeProps} />;
  };

  const onLayoutChange = (layout) => {
    console.log("layout", layout);
    /*  dispatch({
      type: actionTypes.CHANGE_LAYOUT,
      layout: layout,
    }); */
  };

  return (
    <div className="playground">
      <Canvas
        className="canvas"
        ref={ref}
        direction="LEFT"
        maxWidth={10000} // 10k should handle about 50 horizontal nodes
        maxHeight={2000}
        nodes={nodes}
        edges={ed}
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
