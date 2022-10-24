import $axios from "../axios.config";

class Node {
  getAllNodes = (params, chatflow_id) =>
    $axios.get(`api/v1/bot-builder/node/all/${chatflow_id}`, { params });

  postcreateNode = (data) => $axios.post(`api/v1/node`, data);
  postCreateFullNode = (data) =>
    $axios.post(`api/v1/bot-builder/node/full`, data);

  postMessageWidget = (data, node_id) =>
    $axios.post(`api/v1/bot-builder/node/${node_id}/message`, data);

  getConnectWidget = (params, node_id, from_id) =>
    $axios.get(`api/v1/bot-builder/node/connect/${node_id}/${from_id}`, {
      params,
    });

  getNextMove = (params, from_id) =>
    $axios.get(`api/v1/bot-builder/node/${from_id}/next`, { params });
  getDataFacebook = (params, payload) =>
    $axios.get(`api/v1/bot-builder/node/get/${payload}`, { params });
}

const NodeService = new Node();
export default NodeService;
