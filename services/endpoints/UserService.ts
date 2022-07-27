import $axios from "../axios.config";

class User {
  postRegisterUser = (data) => $axios.post(`user/register`, data);
}

const UserService = new User();
export default UserService;
