import $axios from "../axios.config";

class Auth {
  postLoginAccessToken = (data) =>
    $axios.post(`api/v1/auth/access-token`, data);

  postLoginAccessTokenSwagger = (data) =>
    $axios.post(`api/v1/auth/token-swagger`, data);

  postTestToken = (data) =>
    $axios.post(`api/v1/auth/check`, data);

  postHashPassword = (data) =>
    $axios.post(`api/v1/auth/hash-password`, data);
}

const AuthService = new Auth();
export default AuthService;
