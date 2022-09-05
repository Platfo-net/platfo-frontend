import React, { useEffect, useRef, useState } from "react";
import {
  useChatflow,
  useDispatchChatflow,
} from "../../../store/chatflow-context";
import useTranslation from "next-translate/useTranslation";
import { v4 as uuidv4 } from "uuid";
import Input from "../../../../../../../../components/Input/Input";
import PlusIcon from "../../../../../../../../assets/svg/icons/plus.svg";
import CrossIcon from "../../../../../../../../assets/svg/icons/cross.svg";
import chatflowTypes from "../../../store/chatflowTypes";
import SelectBox from "../../../../../../../../components/SelectBox/SelectBox";
import QuickReplyDrawerItem from "./QuickReplyDrawerItem";
import {getEdgesOfWidgets} from "../../../utils/edges";

function MenuDrawerItems({ nodeData }) {
  const chatflowCtx = useChatflow();
  const { nodes, edges } = chatflowCtx;
  const dispatch = useDispatchChatflow();
  const { t } = useTranslation("common");
  const [data, setData] = useState(null);
  const [question, setQuestion] = useState();
  const [choices, setChoices] = useState([]);
  const [quickReplies, setQuickReplies] = useState([]);
  const [target, setTarget] = useState({ options: [], value: "" });
  const choiceRef = useRef("");

  const onChangeSelect = (e) => {
    setTarget({
      ...target,
      value: e.target.value,
    });
  };

  const onChange = (e) => {
    setQuestion(e.target.value);
  };

  const onEditChoices = (value, data, key) => {
    const update = choices.map((item) => {
      if (item.value === data.value) {
        return {
          ...item,
          [key]: key === "label" ? value : {type: "GOTO", data: value},
        };
      } else {
        return {
          ...item,
        };
      }
    });

    setChoices(update);
  };

  const onRemove = (data) => {
    const update = choices.filter((item) => item.value !== data.value);
    setChoices(update);
  };

  const onAddChoice = () => {
    const element = choiceRef.current.value;

    const newChoices = [
      {
        value: uuidv4(),
        label: element,
        action: { type: "GOTO", data: target.value },
      },
      ...choices,
    ]
    setChoices(newChoices);
    console.log(newChoices)
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
        question,
        choices,
        quickReplies
      }
      setData(data);
  }, [question, choices, quickReplies]);

  useEffect(() => {
   if(nodeData) {
     setQuestion(nodeData.data.question);
     setChoices(nodeData.data.choices);
   }
  }, [nodeData]);

  useEffect(() => {
    if(nodes.length > 0) {
      setTarget( { options: nodes, value: "" })
    }
  }, [nodes.length]);

  return (
    <div className="flex flex-col ml-auto p-8 w-11/12">
      <Input
        label={t("question")}
        onChange={onChange}
        value={nodes.find((item) => item.id === nodeData.id).data.question}
      />
      <div className="flex justify-between">
          <SelectBox
              options={target.options}
              label={t("goto")}
              onChange={onChangeSelect}
              labelKey="text"
          />
        <Input
          ref={choiceRef}
          label={t("text")}
          className="rtl:pl-2 ltr:pr-2 mx-2"
        />

          <button
              className="chatbot icon-only mt-auto mb-3  md"
              onClick={onAddChoice}
          >
              <PlusIcon />
          </button>
      </div>
      {nodes
        .find((item) => item.id === nodeData.id)
        .data.choices.map((item) => {
          return (
            <div key={item.value} className="flex justify-between">
                <SelectBox
                    options={target.options}
                    label={t("goto")}
                    onChange={(e) => onEditChoices(e.target.value, item, "action")}
                    value={item.action.data}
                    labelKey="text"
                />
              <Input
                label={t("text")}
                onChange={(e) => onEditChoices(e.target.value, item, "label")}
                value={item.label}
                className="rtl:pl-2 ltr:pr-2 mx-2"
              />

                <button
                    className="danger icon-only mt-auto mb-3 md"
                    onClick={() => onRemove(item)}
                >
                    <CrossIcon />
                </button>
            </div>
          );
        })}

      <QuickReplyDrawerItem nodeData={nodeData} onEditQuickReply={setQuickReplies}/>

    </div>
  );
}

export default MenuDrawerItems;
