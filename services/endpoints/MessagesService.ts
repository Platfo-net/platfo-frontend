import $axios from "../axios.config";

class Messages {
  getCreateMessage = (params) =>
    $axios.get(`contact-services/api/v1/message/`, { params });

  getArchive = (params, page_id, contact_id) =>
    $axios.get(
      `contact-services/api/v1/message/archive/${page_id}/${contact_id}`,
      { params }
    );
}

const MessagesService = new Messages();
export default MessagesService;
