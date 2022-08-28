import { useReducer, useContext, createContext } from 'react'
import {updateObject} from "../../../../../../helpers/updateObject";
import POPUP_POSITION, {chatflowTypes} from "./chatflowTypes";
import SELECTED_PORT from "./chatflowTypes";

const CounterStateContext = createContext()
const CounterDispatchContext = createContext()



const reducer = (state, action) => {
    switch (action.type) {
        case chatflowTypes.CHANGE_NODE:
            return updateObject(state, {
                nodes: action.payload,
            })
        case chatflowTypes.CHANGE_EDGE:
            return updateObject(state, {
                edges: action.payload,
            })
        case chatflowTypes.POPUP_POSITION:
            return updateObject(state, {
                popupPosition: action.payload,
            })
        case chatflowTypes.SHOW_POPUP_MENU:
            return updateObject(state, {
                showPopupMenu: action.payload,
            })
        case chatflowTypes.SELECTED_PORT:
            return updateObject(state, {
                selectedPort: action.payload,
            })
        case chatflowTypes.SELECTED_NODE:
            return updateObject(state, {
                selectedNode: action.payload,
            })
        default:
            throw new Error(`Unknown action: ${action.type}`)
    }
}



export const ChatFlowProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, {
        nodes: [],
        edges: [],
        showPopupMenu: false,
        popupPosition: [0, 0],
        selectedNode: null,
        selectedPort: null,
    })
    return (
        <CounterDispatchContext.Provider value={dispatch}>
            <CounterStateContext.Provider value={state}>
                {children}
            </CounterStateContext.Provider>
        </CounterDispatchContext.Provider>
    )
}

export const useChatflow = () => useContext(CounterStateContext)
export const useDispatchChatflow = () => useContext(CounterDispatchContext)