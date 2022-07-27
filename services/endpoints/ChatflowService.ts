import $axios from "../axios.config";

class Chatflow {
  postCreateChatflow = (data) => $axios.post(`Chatflow`, data);

  deleteChatflow = (params, Chatflow_id) =>
    $axios.delete(`Chatflow/${Chatflow_id}`, { params });

  getUserChatflows = (params) => $axios.get(`Chatflow/all`, { params });
}

const ChatflowService = new Chatflow();
export default ChatflowService;
