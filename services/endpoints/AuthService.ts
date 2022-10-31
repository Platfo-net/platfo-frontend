import { Body_Auth_AccessToken } from '@/types/api';
import BaseApi from '../axios.config';

class Auth extends BaseApi {
  constructor() {
    super({ suffix: 'api/v1/auth' });
  }
  postLogin = (data: Body_Auth_AccessToken) =>
    this.$axios.post(`access-token`, data);
}

const AuthService = new Auth();
export default AuthService;
