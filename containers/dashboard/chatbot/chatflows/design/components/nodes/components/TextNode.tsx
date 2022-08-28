import Input from "components/Input/Input";
import useTranslation from "next-translate/useTranslation";
import chatflowTypes from "../../../store/chatflowTypes";
import {useChatflow, useDispatchChatflow} from "../../../store/chatflow-context";
import TextIcon from "../../../../../../../../assets/svg/icons/text.svg";

type TextNodeProps = {
  [x: string]: any;
};

const TextNode: React.FC<TextNodeProps> = (props) => {
  const chatflowCtx = useChatflow();
  const {nodes} = chatflowCtx;
  const dispatch = useDispatchChatflow()
  const { t } = useTranslation("common");

  const onChange = (e) => {
    onEditTextNodeData(e.target.value, props.node);
  };

  const onEditTextNodeData = (value, nodeData) => {
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

  return (
    <>
      <div className="icon">
        <TextIcon />
      </div>
      {/*<Input label={t("text")} onChange={onChange}></Input>*/}
    </>
  );
};

export default TextNode;
