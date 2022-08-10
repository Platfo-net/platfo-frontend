import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import {
  Canvas,
  EdgeData,
  EdgeProps,
  hasLink,
  NodeData,
  NodeProps,
} from "reaflow";
import { changeEdges } from "stores/actions";
import EdgeComponent from "./components/edges/EdgeComponent/EdgeComponent";
import NodeComponent from "./components/nodes/NodeComponent/NodeComponent";

type ChatFlowDesignProps = {};

const ChatFlowDesign: React.FC<ChatFlowDesignProps> = () => {
  const { nodes, edges, selections } = useAppSelector((state) => ({
    nodes: state.chatflow.nodes,
    edges: state.chatflow.edges,
    selections: state.chatflow.selections,
  }));
  const dispatch = useAppDispatch();

  const onNodeLinkCheck = (event, from: NodeData, to: NodeData) => {
    return !hasLink(edges, from, to);
  };

  const onNodeLink = (event, from, to) => {
    const id = `${from.id}-${to.id}`;
    const newEdges = [
      ...edges,
      {
        id,
        from: from.id,
        to: to.id,
      },
    ];
    dispatch(changeEdges(newEdges));
  };

  const Node = (nodeProps: NodeProps) => {
    return <NodeComponent {...nodeProps} />;
  };

  const Edge = (edgeProps: EdgeProps) => {
    return <EdgeComponent {...edgeProps} />;
  };

  return (
    <div className="playground">
      <Canvas
        direction="LEFT"
        maxWidth={10000} // 10k should handle about 50 horizontal nodes
        maxHeight={2000}
        nodes={nodes}
        edges={edges}
        selections={selections}
        onNodeLinkCheck={onNodeLinkCheck}
        onNodeLink={onNodeLink}
        node={Node}
        edge={Edge}
      />
    </div>
  );
};

export default ChatFlowDesign;
