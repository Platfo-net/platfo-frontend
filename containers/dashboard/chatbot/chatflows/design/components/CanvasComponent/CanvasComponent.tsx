import { useEffect, useRef} from "react";
import {
    Canvas,
    CanvasRef,
    EdgeProps,
    hasLink,
    NodeData,
    NodeProps, PortData,
} from "reaflow";

import {useChatflow, useDispatchChatflow} from "../../store/chatflow-context";
import NodeComponent from "../nodes/NodeComponent";
import EdgeComponent from "../edges/EdgeComponent/EdgeComponent";
import {
    convertApiDataToNodes,
    convertNodesToApiData,
    createStartNodeData,
} from "../../utils/nodes";
import chatflowTypes from "../../store/chatflowTypes";
import {useRouter} from "next/router";
import ChatflowUIService from "../../../../../../../services/endpoints/ChatflowUIService";
import useTranslation from "next-translate/useTranslation";
import {convertApiDataToEdges, convertEdgestoApiData} from "../../utils/edges";

type ChatFlowDesignProps = {};

const CanvasComponent: React.FC<ChatFlowDesignProps> = () => {
    const { t } = useTranslation()
    const router = useRouter();
    const chatflowCtx = useChatflow();
    const {nodes, edges, chatflowInfo} = chatflowCtx;
    const dispatch = useDispatchChatflow()

    const ref = useRef<CanvasRef | null>(null);

    const Node = (nodeProps: NodeProps) => {
        return (<NodeComponent {...nodeProps}/>);
    };

    const Edge = (edgeProps: EdgeProps) => {
        return <EdgeComponent {...edgeProps} />;
    };

    const onNodeLinkCheck = (event, from: NodeData, to: NodeData, port: PortData) => {
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
        dispatch({
            type: chatflowTypes.CHANGE_EDGE,
            payload: newEdges
        })
    };

    const onCanvasClick = () => {
        dispatch({
            type: chatflowTypes.SHOW_POPUP_MENU,
            payload: false
        })
        dispatch({
            type: chatflowTypes.SELECTED_PORT,
            payload: null
        })
        dispatch({
            type: chatflowTypes.SELECTED_NODE,
            payload: null
        })
    };

    const onLayoutChange = (values) => {
        // TODO CHACK WHEN UPDATE
    };

    const onClickSave = async () => {

            const newEdges = convertEdgestoApiData(edges)
            const newNodes = convertNodesToApiData(nodes)
            const data = {
                name: chatflowInfo.name,
                chatflow_id: chatflowInfo.chatflow_id,
                nodes: newNodes,
                edges: newEdges
            }
            console.log(data)
            //todo set from chatflow info
            const response = ChatflowUIService.postChatflowData(router.query.id, data);

    }

    useEffect(() => {
         console.log("nodes", nodes)
        const startNode = nodes?.find((node) => node?.data?.type === "start");
         if (!startNode) {
            const startData = createStartNodeData();
             dispatch({
                 type: chatflowTypes.CHANGE_NODE,
                 payload: [...nodes, startData]
             });
         }
    }, [nodes]);

    useEffect(() => {
         console.log("edges", edges)
    }, [edges]);

    useEffect(() => {
        (async () => {

                if(router.query.id) {
                    const response = await ChatflowUIService.getChatflowData(router.query.id, null);
                    console.log(response.data)
                    const convertedNodes = await convertApiDataToNodes(response.data)
                    const chatflowData = {
                        name : response.data.name,
                        chatflow_id: response.data.chatflow_id
                    }
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
                        payload: newEdges
                    })
                }

        })()
    }, [])

    return (
            <div className="playground">
                <button className="primary m-4" onClick={onClickSave}>
                    {t("save")}
                </button>
                <Canvas

                    className="canvas"
                    ref={ref}
                     direction="LEFT"
                    maxWidth={10000}
                    maxHeight={2000}
                    nodes={nodes}
                    edges={edges}
                    // selections={selections}
                    onNodeLinkCheck={onNodeLinkCheck}
                    onNodeLink={onNodeLink}
                    node={Node}
                    edge={Edge}
                    onLayoutChange={onLayoutChange}
                    onCanvasClick={onCanvasClick}
                />
            </div>
    );
};

export default CanvasComponent;
