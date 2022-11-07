import { IParams_Pagination } from '@/types/api';
import BaseApi from '../axios.config';

class Notification extends BaseApi {
  constructor() {
    super({ suffix: 'api/v1/notification' });
  }
  getNotifications = (params?: IParams_Pagination) =>
    this.$axios.get(`all`, { params });
}

const NotificationService = new Notification();
export default NotificationService;
