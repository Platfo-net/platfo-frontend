import $axios from "../axios.config";

class Node {
  postcreateNode = (data) => $axios.post(`node`, data);

  postMessageWidget = (data, node_id) =>
    $axios.post(`node/${node_id}/message`, data);

  postMenuWidget = (data, node_id) => $axios.post(`node/${node_id}/menu`, data);

  getConnectWidget = (params, node_id, from_id) =>
    $axios.get(`node/${node_id}/${from_id}`, { params });
}

const NodeService = new Node();
export default NodeService;
