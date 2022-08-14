import $axios from "../axios.config";

class HealthCheck {
  getAllTriggers = (params) => $axios.get(`health`, { params });
}

const HealthCheckService = new HealthCheck();
export default HealthCheckService;
