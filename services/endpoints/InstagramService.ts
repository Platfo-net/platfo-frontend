import { Body_Instagram } from '@/types/api';
import BaseApi from '../axios.config';

class Instagram extends BaseApi {
  constructor() {
    super({ suffix: 'api/v1/instagram' });
  }
  postToConnectInstagram = (data: Body_Instagram) => this.$axios.post('', data);
}

const InstagramService = new Instagram();
export default InstagramService;
