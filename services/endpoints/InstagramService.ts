import $axios from "../axios.config";

class Instagram {
  postConnectInstagram = (data) => $axios.post(`api/v1/instagram`, data);

  deleteFacebookDisconnectPage = () =>
    $axios.delete(`api/v1/instagram`);

  getInstagramAccountData = (id) => $axios.get(`api/v1/instagram/get/${id}`);
}

const InstagramService = new Instagram();
export default InstagramService;
