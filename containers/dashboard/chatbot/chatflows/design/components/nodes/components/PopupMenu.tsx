import useTranslation from "next-translate/useTranslation";
import React, { useEffect } from "react";
import {
  useChatflow,
  useDispatchChatflow,
} from "../../../store/chatflow-context";
import {
  createDefaultMenuNodeData,
  createDefaultTextNodeData,
} from "../../../utils/nodes";
import chatflowTypes from "../../../store/chatflowTypes";
import { createEdge } from "../../../utils/edges";

type PopupMenuProps = {
  [x: string]: any;
};

const PopupMenu: React.FC<PopupMenuProps> = () => {
  const chatflowCtx = useChatflow();
  const {
    nodes,
    edges,
    selectedNode,
    selectedPort,
    showPopupMenu,
    popupPosition,
  } = chatflowCtx;
  const dispatch = useDispatchChatflow();

  const { t } = useTranslation("common");

  useEffect(() => {
    if (showPopupMenu) {
      document.getElementById(
        "picker-menu"
      ).style.top = `${popupPosition[1]}px`;
      document.getElementById(
        "picker-menu"
      ).style.right = `${popupPosition[0]}px`;
    }
  }, [popupPosition]);

  const onClickAddTextBlock = async () => {
    dispatch({
      type: chatflowTypes.SHOW_POPUP_MENU,
      payload: false,
    });
    const numberOfTextNode =
      nodes.filter((node) => node.data.type === "TEXT").length + 1;
    const textData = await createDefaultTextNodeData(numberOfTextNode);
    dispatch({
      type: chatflowTypes.CHANGE_NODE,
      payload: [...nodes, textData],
    });

    const toPort = await textData.ports.find((item) => item.side === "EAST");
    const fromNode = { id: selectedNode.id, portId: selectedPort.id };
    const toNode = { id: textData.id, portId: toPort.id };
    const edgesData = await createEdge(fromNode, toNode);
    const newEdges = [...edges, edgesData];
    dispatch({
      type: chatflowTypes.CHANGE_EDGE,
      payload: newEdges,
    });
  };

  const onClickAddMenuBlock = async () => {
    dispatch({
      type: chatflowTypes.SHOW_POPUP_MENU,
      payload: false,
    });

    const numberOfMenuNode =
      nodes.filter((node) => node.data.type === "MENU").length + 1;
    const textData = await createDefaultMenuNodeData(numberOfMenuNode);
    dispatch({
      type: chatflowTypes.CHANGE_NODE,
      payload: [...nodes, textData],
    });

    const toPort = await textData.ports.find((item) => item.side === "EAST");
    const fromNode = { id: selectedNode.id, portId: selectedPort.id };
    const toNode = { id: textData.id, portId: toPort.id };
    const edgesData = await createEdge(fromNode, toNode);
    const newEdges = [...edges, edgesData];
    dispatch({
      type: chatflowTypes.CHANGE_EDGE,
      payload: newEdges,
    });
  };

  return (
    <div
      id="picker-menu"
      className={`block-picker-menu ${showPopupMenu ? "" : "hidden"}`}
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