import { Params_Account_All } from '@/types/api';
import BaseApi from '../axios.config';

class Account extends BaseApi {
  constructor() {
    super({ suffix: 'api/v1/account' });
  }
  getAccounts = (params?: Params_Account_All) =>
    this.$axios.get(`all`, { params });

  getAccount = (id: string) => this.$axios.get(id);

  deleteAccount = (id: string) => this.$axios.delete(id);
}

const AccountService = new Account();
export default AccountService;
