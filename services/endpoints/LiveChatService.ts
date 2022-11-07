import BaseApi from '../axios.config';
import { Body_Livechat_Contact_All_FacebookPageId } from '@/types/api';

class LiveChat extends BaseApi {
  constructor() {
    super({ suffix: 'api/v1/live-chat' });
  }
  // TODO Pagination Params
  getContacts = (
    page_id: string,
    data: Body_Livechat_Contact_All_FacebookPageId = []
  ) => this.$axios.post(`contact/all/${page_id}`, data);

  getContact = (id: string) => this.$axios.get(`contact/${id}`);
}

const LiveChatService = new LiveChat();
export default LiveChatService;
