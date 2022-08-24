import $axios from "../axios.config";

class Accounts {
  getAccounts = () => $axios.get(`api/v1/account/all`);
}

const AccountsService = new Accounts();
export default AccountsService;
