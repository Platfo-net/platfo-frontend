import $axios from "../axios.config";

class Chatflow {
  postCreateChatflow = (data) => $axios.post(`api/v1/chatflow`, data);

  deleteChatflow = ( Chatflow_id) =>
    $axios.delete(`api/v1/chatflow/${Chatflow_id}`);

  getUserChatflows = (params) =>
    $axios.get(`api/v1/chatflow/all`, { params });
}

const ChatflowService = new Chatflow();
export default ChatflowService;
