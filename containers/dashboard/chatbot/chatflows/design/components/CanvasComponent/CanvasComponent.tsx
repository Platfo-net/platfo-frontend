import { useEffect, useRef, useState} from "react";
import {
    Canvas,
    CanvasRef,
    EdgeProps,
    hasLink,
    NodeData,
    NodeProps, PortData,
} from "reaflow";

import { v4 as uuidv4 } from "uuid";
import {useChatflow, useDispatchChatflow} from "../../store/chatflow-context";
import NodeComponent from "../nodes/NodeComponent";
import EdgeComponent from "../edges/EdgeComponent/EdgeComponent";
import {createStartNodeData, translateXYToCanvasPosition} from "../../utils/nodes";
import chatflowTypes from "../../store/chatflowTypes";

type ChatFlowDesignProps = {};

const CanvasComponent: React.FC<ChatFlowDesignProps> = () => {
    const chatflowCtx = useChatflow();
    const {nodes, edges} = chatflowCtx;
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
        console.log("onLayoutChange");
        // TODO CHACK WHEN UPDATE
    };

    useEffect(() => {
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
        console.log("edeges ", edges);
    }, [edges]);


    return (
            <div className="playground">
                <Canvas
                    arrow={null}
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
                    layoutOptions={{
                        "elk.algorithm": "layered",
                    }}
                    onCanvasClick={onCanvasClick}
                />
            </div>
    );
};

export default CanvasComponent;
