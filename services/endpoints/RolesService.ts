import $axios from "../axios.config";

class Roles {
  getRoles = (params) => $axios.get(`roles/`, { params });
}

const RolesService = new Roles();
export default RolesService;
