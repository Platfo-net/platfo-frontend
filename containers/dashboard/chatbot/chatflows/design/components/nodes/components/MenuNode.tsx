import Input from "components/Input/Input";
import useTranslation from "next-translate/useTranslation";
import { useEffect, useRef, useState } from "react";
import PlusIcon from "../../../../../../../../assets/svg/icons/plus.svg";
import CrossIcon from "../../../../../../../../assets/svg/icons/cross.svg";
import { v4 as uuidv4 } from "uuid";
import {useChatflow, useDispatchChatflow} from "../../../store/chatflow-context";
import chatflowTypes from "../../../store/chatflowTypes";

type MenuNodeProps = {
  [x: string]: any;
};

const MenuNode: React.FC<MenuNodeProps> = (props) => {
  const chatflowCtx = useChatflow();
  const {nodes} = chatflowCtx;
  const dispatch = useDispatchChatflow()

  const { t } = useTranslation("common");
  const { node } = props;
  const [question, setQuestion] = useState(node.data.question);
  const [data, setData] = useState(null);
  const [choices, setChoices] = useState(node.data.choices);
  const [height, setHeight] = useState(node.height);
  const choiceRef = useRef("");

  const onChange = (e) => {
    setQuestion(e.target.value);
  };

  const onEditChoices = (value, data) => {
    const update = choices.map((item) => {
      if (item.value === data.value) {
        return {
          ...item,
          label: value,
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
    setChoices([{ value: uuidv4(), label: element }, ...choices]);
    setHeight(height + 86);
  };

  useEffect(() => {
    if (data) {
      console.log(data);
      onEditMenuNodeData(data, height, node);
    }
  }, [data]);

  useEffect(() => {
    const data = {
      ...node.data,
      question,
      choices,
    };
    setData(data);
  }, [question, choices]);

  const onEditMenuNodeData = (value, height, nodeData) => {
    const updateNodes = nodes.map((item) => {
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
    dispatch({
      type: chatflowTypes.CHANGE_NODE,
      payload: updateNodes
    })
  };

  return (
    <div className="flex flex-col">
      <Input label={t("question")} onChange={onChange}></Input>
      <div className="flex justify-between">
        <button
          className="chatbot icon-only mt-auto mb-3 "
          onClick={onAddChoice}
        >
          <PlusIcon />
        </button>
        <Input
          ref={choiceRef}
          label={t("text")}
          className="rtl:pl-2 ltr:pr-2"
        ></Input>
      </div>
      {choices.map((item) => {
        return (
          <div key={item.value} className="flex justify-between">
            <button
              className="danger icon-only mt-auto mb-3 "
              onClick={() => onRemove(item)}
            >
              <CrossIcon />
            </button>
            <Input
              label={t("text")}
              onChange={(e) => onEditChoices(e.target.value, item)}
              value={item.label}
              className="rtl:pl-2 ltr:pr-2"
            ></Input>
          </div>
        );
      })}
    </div>
  );
};

export default MenuNode;
