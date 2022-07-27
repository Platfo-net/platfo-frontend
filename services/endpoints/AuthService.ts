import $axios from "../axios.config";

class Auth {
  postLoginAccessToken = (data) => $axios.post(`auth/access-token`, data);

  postTestToken = (data) => $axios.post(`auth/check`, data);

  postHashPassword = (data) => $axios.post(`auth/hash-password`, data);
}

const AuthService = new Auth();
export default AuthService;
