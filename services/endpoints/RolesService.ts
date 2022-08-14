import $axios from "../axios.config";

class Roles {
  getRoles = (params) => $axios.get(`user-services/api/v1/roles/`, { params });
}

const RolesService = new Roles();
export default RolesService;
