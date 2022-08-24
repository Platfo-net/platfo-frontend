import Input from "components/Input/Input";
import useTranslation from "next-translate/useTranslation";

type TextNodeProps = {
  [x: string]: any;
};

const TextNode: React.FC<TextNodeProps> = (props) => {
  const { t } = useTranslation("common");
  const { node, onEditTextNodeData } = props;

  const onChange = (e) => {
    onEditTextNodeData(e.target.value, props.node);
  };

  return (
    <div className="">
      <Input label={t("text")} onChange={onChange}></Input>
    </div>
  );
};

export default TextNode;
