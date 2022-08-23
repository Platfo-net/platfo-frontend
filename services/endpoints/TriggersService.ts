import $axios from "../axios.config";

class Triggers {
  getAllTriggers = (params) =>
    $axios.get(`user-services/api/v1/trigger/all`, { params });
  postCreateTrigger = (data) =>
    $axios.post(`user-services/api/v1/trigger`, data);
}

const TriggersService = new Triggers();
export default TriggersService;
