import $axios from "../axios.config";

class Node {
  getAllNodes = (params, chatflow_id) =>
    $axios.get(`chatflow-services/api/v1/node/all/${chatflow_id}`, { params });

  postcreateNode = (data) => $axios.post(`chatflow-services/api/v1/node`, data);
  postCreateFullNode = (data) =>
    $axios.post(`chatflow-services/api/v1/node/full`, data);

  postMessageWidget = (data, node_id) =>
    $axios.post(`chatflow-services/api/v1/node/${node_id}/message`, data);

  postMenuWidget = (data, node_id) =>
    $axios.post(`chatflow-services/api/v1/node/${node_id}/menu`, data);

  getConnectWidget = (params, node_id, from_id) =>
    $axios.get(`chatflow-services/api/v1/node/connect/${node_id}/${from_id}`, {
      params,
    });

  getNextMove = (params, from_id) =>
    $axios.get(`chatflow-services/api/v1/node/${from_id}/next`, { params });
  getDataFacebook = (params, payload) =>
    $axios.get(`chatflow-services/api/v1/node/get/${payload}`, { params });
}

const NodeService = new Node();
export default NodeService;
