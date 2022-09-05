import TextIcon from "../../../../../../../../assets/svg/icons/comment-alt.svg";

type TextNodeProps = {
  [x: string]: any;
};

const TextNode: React.FC<TextNodeProps> = () => {
  return (
      <div className="icon">
        <TextIcon />
      </div>
  );
};

export default TextNode;
