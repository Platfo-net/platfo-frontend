import React, { useEffect, useRef, useState } from "react";
import { useChatflow } from "../../../store/chatflow-context";
import useTranslation from "next-translate/useTranslation";
import { v4 as uuidv4 } from "uuid";
import Input from "../../../../../../../../components/Input/Input";
import PlusIcon from "../../../../../../../../assets/svg/icons/plus.svg";
import CrossIcon from "../../../../../../../../assets/svg/icons/cross.svg";
import SelectBox from "../../../../../../../../components/SelectBox/SelectBox";

function QuickReplyDrawerItem({ nodeData, onEditQuickReply }) {
  const chatflowCtx = useChatflow();
  const { nodes } = chatflowCtx;
  const { t } = useTranslation("common");
  const [data, setData] = useState(null);
  const [quickReplies, setQuickReplies] = useState([]);
  const [target, setTarget] = useState({ options: [], value: "" });
  const tagRef = useRef("");

  const onChangeSelect = (e) => {
    setTarget({
      ...target,
      value: e.target.value,
    });
  };

  const onEditQuickReplies = (value, data, key) => {
    const update = quickReplies.map((item) => {
      if (item.value === data.value) {
        return {
          ...item,
          [key]: key === "label" ? value : { type: "GOTO", data: value },
        };
      } else {
        return {
          ...item,
        };
      }
    });

    setQuickReplies(update);
  };

  const onRemove = (data) => {
    const update = quickReplies.filter((item) => item.value !== data.value);
    setQuickReplies(update);
  };

  const onAddChoice = () => {
    const element = tagRef.current.value;
    // @ts-ignore
    setQuickReplies([
      {
        value: uuidv4(),
        label: element,
        action: { type: "GOTO", data: target.value },
      },
      ...quickReplies,
    ]);
  };

  const onEditMenuNodeData = async (value) => {
    onEditQuickReply(value.quickReplies);
  };

  useEffect(() => {
    if (data) {
      onEditMenuNodeData(data, nodeData);
    }
  }, [data]);

  useEffect(() => {
    if (quickReplies.length > 0) {
      const data = {
        ...nodeData.data,
        quickReplies,
      };
      setData(data);
    }
  }, [quickReplies]);

  useEffect(() => {
    if (nodeData) {
      setQuickReplies(nodeData.data.quickReplies);
    }
  }, [nodeData]);

  useEffect(() => {
    const selectableNodes = nodes?.filter(
      (node) => node.data.type !== "START" && node.id !== nodeData.id
    );
    if (selectableNodes.length > 0) {
      setTarget({ options: selectableNodes, value: "" });
    }
  }, [nodes.length]);

  return (
    <>
      {target.options.length > 0 && (
        <div className="flex flex-col rtl:ml-auto ltr:mr-auto ">
          <h3>{t("quick-replies")}</h3>
          <div className="flex justify-between">
            <Input
                ref={tagRef}
                label={t("text")}
                className="rtl:pl-2 ltr:pr-2 "
            />
            <SelectBox
              options={target.options}
              label={t("goto")}
              onChange={onChangeSelect}
              labelKey="text"
              className="mx-2"

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
            ?.data.quickReplies.map((item) => {
              return (
                <div key={item.value} className="flex justify-between">
                  <Input
                      label={t("text")}
                      onChange={(e) =>
                          onEditQuickReplies(e.target.value, item, "label")
                      }
                      value={item.label}
                      className="rtl:pl-2 ltr:pr-2"
                  />
                  <SelectBox
                    options={target.options}
                    label={t("goto")}
                    onChange={(e) =>
                      onEditQuickReplies(e.target.value, item, "action")
                    }
                    value={item.action.data}
                    labelKey="text"
                    className="mx-2"

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
        </div>
      )}
    </>
  );
}

export default QuickReplyDrawerItem;
