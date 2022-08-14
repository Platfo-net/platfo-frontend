import $axios from "../axios.config";

class User {
  postRegisterUser = (data) =>
    $axios.post(`user-services/api/v1/user/register`, data);
  postCreateUser = (data) => $axios.post(`user-services/api/v1/user`, data);
  deleteUser = (params, user_id) =>
    $axios.delete(`user-services/api/v1/user/${user_id}`, { params });
  getAllUsers = (params) =>
    $axios.get(`user-services/api/v1/user/all`, { params });
  getUserMe = (params) =>
    $axios.get(`user-services/api/v1/user/me`, { params });
  putUpdateUserMe = (data) =>
    $axios.put(`user-services/api/v1/user/me`, { data });
  putChangePasswordMe = (data) =>
    $axios.put(`user-services/api/v1/user/`, { data });
  postForgetPassword = (data) =>
    $axios.post(`user-services/api/v1/user/forget-password`, data);
  postRecoveryPassword = (data) =>
    $axios.post(`user-services/api/v1/user/recovery-password`, data);
}

const UserService = new User();
export default UserService;
