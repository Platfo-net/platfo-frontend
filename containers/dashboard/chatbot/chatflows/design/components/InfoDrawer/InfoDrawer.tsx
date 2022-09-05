import useTranslation from "next-translate/useTranslation";
import Drawer from "../../../../../../../components/Drawer/Drawer";
import {useChatflow, useDispatchChatflow} from "../../store/chatflow-context";
import React from "react";
import chatflowTypes from "../../store/chatflowTypes";
import TextDrawerItems from "./components/TextDrawerItems";
import MenuDrawerItems from "./components/MenuDrawerItems";

type PopupMenuProps = {
    [x: string]: any;
};

const PopupMenu: React.FC<PopupMenuProps> = () => {
    const chatflowCtx = useChatflow();
    const { drawerData, showDrawer} = chatflowCtx;
    const dispatch = useDispatchChatflow()

    const { t } = useTranslation("common");

    const drawerHandler = (value) => {
        dispatch({
            type: chatflowTypes.SHOW_DRAWER,
            payload: value
        })
    }

    return (
        <Drawer isOpen={showDrawer} setIsOpen={drawerHandler} title={t(`edit-${drawerData?.data.type}`)}>
            {drawerData?.data?.type === "text" && <TextDrawerItems nodeData={drawerData}/>}
            {drawerData?.data?.type === "menu" && <MenuDrawerItems nodeData={drawerData}/>}
        </Drawer>
    );
};

export default PopupMenu;
