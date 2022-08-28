import $axios from "../axios.config";

class Roles {
  getRoles = (params) => $axios.get(`api/v1/roles/`, { params });
}

const RolesService = new Roles();
export default RolesService;
