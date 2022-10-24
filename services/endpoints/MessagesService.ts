import $axios from "../axios.config";

class Messages {
  postMessage = (from_page_id,to_contact_igs_id, data ) =>
    $axios.post(`api/v1/live-chat/message/send/${from_page_id}/${to_contact_igs_id}`, data);

  getArchive = (params, page_id, contact_id) =>
    $axios.get(`api/v1/live-chat/message/archive/${page_id}/${contact_id}`, { params });
}

const MessagesService = new Messages();
export default MessagesService;
