import $axios from "../axios.config";

class Instagram {
  postConnectInstagram = (data) =>
    $axios.post(`user-services/api/v1/instagram`, data);

  deleteFacebookDisconnectPage = (params) =>
    $axios.delete(`user-services/api/v1/instagram`, { params });

  getInstagramAccountData = (id) =>
    $axios.get(`user-services/api/v1/instagram/get/${id}`);
}

const InstagramService = new Instagram();
export default InstagramService;
