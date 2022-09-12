import $axios from "../axios.config";

class Accounts {
  getAccounts = () => $axios.get(`api/v1/account/all`);
  deleteAccount = (id) => $axios.delete(`api/v1/account/${id}`);
 getAccount = (id) => $axios.get(`api/v1/account/${id}`);
}

const AccountsService = new Accounts();
export default AccountsService;
