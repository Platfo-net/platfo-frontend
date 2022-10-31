import BaseApi from '../axios.config';

class LiveChat extends BaseApi {
  constructor() {
    super({ suffix: 'api/v1' });
  }
  // TODO Pagination Params
  getContacts = (page_id?: string) =>
    this.$axios.get(`contact/page/${page_id}`);
}

const LiveChatService = new LiveChat();
export default LiveChatService;
