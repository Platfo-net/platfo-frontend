import React, { useEffect, useRef } from "react";
import {
  Canvas,
  CanvasRef,
  EdgeProps,
  NodeProps,
} from "reaflow";
import { useChatflow, useDispatchChatflow } from "../../store/chatflow-context";
import NodeComponent from "../nodes/NodeComponent";
import EdgeComponent from "../edges/EdgeComponent/EdgeComponent";
import {
  checkPortStatus,
  convertApiDataToNodes,
  convertNodesToApiData, createDefaultMenuNodeData, createDefaultTextNodeData,
  createStartNodeData, updatePortStatus,
} from "../../utils/nodes";
import chatflowTypes from "../../store/chatflowTypes";
import { useRouter } from "next/router";
import ChatflowUIService from "../../../../../../../services/endpoints/ChatflowUIService";
import useTranslation from "next-translate/useTranslation";
import {
  convertApiDataToEdges,
  convertEdgesToApiData, createEdge, createNewEdge,
} from "../../utils/edges";

type ChatFlowDesignProps = {};

const CanvasComponent: React.FC<ChatFlowDesignProps> = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const chatflowCtx = useChatflow();
  const { nodes, edges, chatflowInfo } = chatflowCtx;
  const dispatch = useDispatchChatflow();

  const ref = useRef<CanvasRef | null>(null);

  const Node = (nodeProps: NodeProps) => {
    return <NodeComponent {...nodeProps} />;
  };

  const Edge = (edgeProps: EdgeProps) => {
    return <EdgeComponent {...edgeProps} />;
  };

 /* const onNodeLinkCheck = (
    event,
    from: NodeData,
    to: NodeData,
    port: PortData
  ) => {
    return !hasLink(edges, from, to);
  };*/

/*
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
      console.log("newEdges")
      console.log(newEdges)
    dispatch({
      type: chatflowTypes.CHANGE_EDGE,
      payload: newEdges,
    });
  };
*/

  const onCanvasClick = () => {
    dispatch({
      type: chatflowTypes.SHOW_POPUP_MENU,
      payload: false,
    });
    dispatch({
      type: chatflowTypes.SELECTED_PORT,
      payload: null,
    });
    dispatch({
      type: chatflowTypes.SELECTED_NODE,
      payload: null,
    });
  };

  const onLayoutChange = (values) => {
    // TODO CHACK WHEN UPDATE
  };

  const onClickSave = async () => {
    try {
      const newEdges = convertEdgesToApiData(edges);
      const newNodes = convertNodesToApiData(nodes);
      const data = {
        name: chatflowInfo.name,
        chatflow_id: chatflowInfo.chatflow_id,
        nodes: newNodes,
        edges: newEdges,
      };
      // console.log(data);
      //todo set from chatflow info
      const response = await ChatflowUIService.postChatflowData(
        router.query.id,
        data
      );
      router.push("/dashboard/chatbot");
    } catch (e) {}
  };

  const onClickAddTextBlock = async () => {
    dispatch({
      type: chatflowTypes.SHOW_POPUP_MENU,
      payload: false,
    });
    const numberOfTextNode =
        nodes.filter((node) => node.data.type === "TEXT").length + 1;
    const textData = await createDefaultTextNodeData(numberOfTextNode);
    dispatch({
      type: chatflowTypes.CHANGE_NODE,
      payload: [...nodes, textData],
    });
  };

  const onClickAddMenuBlock = async () => {
    dispatch({
      type: chatflowTypes.SHOW_POPUP_MENU,
      payload: false,
    });

    const numberOfMenuNode =
        nodes.filter((node) => node.data.type === "MENU").length + 1;
    const textData = await createDefaultMenuNodeData(numberOfMenuNode);
    dispatch({
      type: chatflowTypes.CHANGE_NODE,
      payload: [...nodes, textData],
    });
  };

  useEffect(() => {
    // console.log("nodes" )
    // console.log(nodes )
    const startNode = nodes?.find((node) => node?.data?.type === "START");
    if (!startNode) {
      const startData = createStartNodeData();
      dispatch({
        type: chatflowTypes.CHANGE_NODE,
        payload: [...nodes, startData],
      });
    }
    if(nodes.length === 2 && edges.length === 0) {
      const newEdge =  createNewEdge(nodes[0], nodes[1]);
      const newEdges = [...edges, newEdge];
      dispatch({
        type: chatflowTypes.CHANGE_EDGE,
        payload: newEdges,
        payload: newEdges,
      });
    }
  }, [nodes]);

  useEffect(() => {
    // console.log("edges" )
    // console.log(edges )

  }, [edges]);

  useEffect(() => {
    (async () => {
      try {
        if (router.query.id) {
          const response = await ChatflowUIService.getChatflowData(
            router.query.id,
            null
          );
          const convertedNodes = await convertApiDataToNodes(response.data);
          const chatflowData = {
            name: response.data.name,
            chatflow_id: response.data.chatflow_id,
          };
          dispatch({
            type: chatflowTypes.CHATFLOW_INFO,
            payload: chatflowData,
          });
          dispatch({
            type: chatflowTypes.CHANGE_NODE,
            payload: convertedNodes,
          });
          const newEdges = await convertApiDataToEdges(response.data);
          dispatch({
            type: chatflowTypes.CHANGE_EDGE,
            payload: newEdges,
          });
        }
      } catch (e) {}
    })();
  }, []);

  return (
    <div className="playground">
      <div className={"flex flex-row w-40 m-3"}>
        <button className="secondary  m-1" onClick={onClickSave}>
          {t("save")}
        </button>
        <button className="primary m-1" onClick={onClickAddTextBlock}>
          {t("text")}
        </button>
        <button className="primary  m-1" onClick={onClickAddMenuBlock}>
          {t("menu")}
        </button>

      </div>

      <Canvas
        className="canvas"
        ref={ref}
        direction="LEFT"
        maxWidth={10000}
        maxHeight={2000}
        nodes={nodes}
        edges={edges}
        // selections={selections}
        // onNodeLinkCheck={onNodeLinkCheck}
        // onNodeLink={onNodeLink}
        node={Node}
        edge={Edge}
        onLayoutChange={onLayoutChange}
        onCanvasClick={onCanvasClick}
      />
    </div>
  );
};

export default CanvasComponent;
