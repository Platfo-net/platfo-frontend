import chatflowTypes from "../../../store/chatflowTypes";
import Input from "../../../../../../../../components/Input/Input";
import {useChatflow, useDispatchChatflow} from "../../../store/chatflow-context";
import useTranslation from "next-translate/useTranslation";
import QuickReplyDrawerItem from "./QuickReplyDrawerItem";
import {getEdgesOfWidgets} from "../../../utils/edges";
import {useEffect, useState} from "react";

function TextDrawerItems({ nodeData }) {
    const chatflowCtx = useChatflow();
    const {nodes, edges} = chatflowCtx;
    const dispatch = useDispatchChatflow()
    const { t } = useTranslation("common");
    const [data, setData] = useState(null);
    const [quickReplies, setQuickReplies] = useState([]);

    const onChange = (e) => {
        const value = e.target.value;
        const updateNodes = nodes.map((item) => {
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
        dispatch({
            type: chatflowTypes.CHANGE_NODE,
            payload: updateNodes
        })
    };

    const onEditMenuNodeData = async (value, nodeData) => {
        const updateNodes = nodes.map((item) => {
            if (item.id === nodeData.id) {
                return {
                    ...item,
                    data: value,
                };
            } else {
                return {
                    ...item,
                };
            }
        });
        dispatch({
            type: chatflowTypes.CHANGE_NODE,
            payload: updateNodes,
        });

        const newEdges = await getEdgesOfWidgets(nodeData, updateNodes, edges)
        dispatch({
            type: chatflowTypes.CHANGE_EDGE,
            payload: newEdges
        });
    };

    useEffect(() => {
        if (data) {
            onEditMenuNodeData(data, nodeData);
        }
    }, [data]);

    useEffect(() => {
        const data = {
            ...nodeData.data,
            quickReplies
        }
        setData(data);
    }, [quickReplies]);


  return <div className="ml-auto p-8 w-11/12">
      <Input label={t("text")} onChange={onChange} value={nodes.find(item => item.id === nodeData.id).data.value}/>
      <QuickReplyDrawerItem nodeData={nodeData} onEditQuickReply={setQuickReplies}/>
  </div>;
}

export default TextDrawerItems;