import $axios from "../axios.config";

class Connection {
  getConnections = (params) => $axios.get(`api/v1/connection/all`, { params });
  postCreateConnection = (data) => $axios.post(`api/v1/connection/`, data);
  getConnectionDetails = (id) => $axios.get(`api/v1/connection/${id}`);
  putUpdateConnection = (data, id) =>
    $axios.put(`api/v1/connection/${id}`, data);
  deleteConnection = (id) => $axios.delete(`api/v1/connection/${id}`);
  getRelatedChatflow = (params, page_id, trigger_name) =>
    $axios.get(`api/v1/connectionrelated_chatflow/${page_id}/${trigger_name}`, {
      params,
    });
}

const ConnectionService = new Connection();
export default ConnectionService;
