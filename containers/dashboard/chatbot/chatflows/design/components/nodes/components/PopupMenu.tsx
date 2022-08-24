import useTranslation from "next-translate/useTranslation";
import { useEffect } from "react";

type PopupMenuProps = {
  [x: string]: any;
};

const PopupMenu: React.FC<PopupMenuProps> = (props) => {
  const { t } = useTranslation("common");
  const { position, open, onClickAddTextBlock, onClickAddMenuBlock } = props;
  useEffect(() => {
    if (open) {
      document.getElementById("picker-menu").style.top = `${position[1]}px`;
      document.getElementById("picker-menu").style.right = `${position[0]}px`;
    }
  }, [props]);

  return (
    <div
      id="picker-menu"
      className={`block-picker-menu ${open ? "" : "hidden"}`}
    >
      <div className={"blocks-picker"}>
        <button className="primary my-2" onClick={onClickAddTextBlock}>
          {t("text")}
        </button>
        <button className="primary" onClick={onClickAddMenuBlock}>
          {t("menu")}
        </button>
      </div>
    </div>
  );
};

export default PopupMenu;
