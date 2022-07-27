import $axios from "../axios.config";

class Instagram {
  postConnectInstagram = (data) => $axios.post(`instagram`, data);
}

const InstagramService = new Instagram();
export default InstagramService;
