import $axios from "../axios.config";

class Accounts {
  getAccounts = () => $axios.get(`user-services/api/v1/account`);
}

const AccountsService = new Accounts();
export default AccountsService;
