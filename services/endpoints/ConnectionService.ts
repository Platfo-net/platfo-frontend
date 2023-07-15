import { Params_Connection_All } from '@/types/api';
import BaseApi from '../axios.config';

class Connection extends BaseApi {
  constructor() {
    super({ suffix: 'api/v1/connection' });
  }
  getConnections = (params?: Params_Connection_All) =>
    this.$axios.get(`all`, { params });

  getConnection = (id: string) => this.$axios.get(id);

  deleteConnection = (id: string) => this.$axios.delete(id);
}

const ConnectionService = new Connection();
export default ConnectionService;
