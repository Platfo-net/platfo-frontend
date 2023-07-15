import $axios from "../axios.config";

class ChatflowUI {
    getChatflowData = (id, params) =>
        $axios.get(`api/v1/bot-builder/chatflow-ui/nodes/all/${id}`, { params });

    postChatflowData = (id, data) =>
        $axios.post(`api/v1/bot-builder/chatflow-ui/${id}`, data);
}

const ChatflowUIService = new ChatflowUI();
export default ChatflowUIService;