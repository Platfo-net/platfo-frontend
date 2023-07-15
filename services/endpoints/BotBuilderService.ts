import BaseApi from '../axios.config';

class BotBuilder extends BaseApi {
  constructor() {
    super({ suffix: 'api/v1' });
  }

  // TODO params for pagination
  getChatflows = (params?: any) => this.$axios.get(`chatflow/all`, { params });

  deleteChatflow = (id: string) => this.$axios.delete(`chatflow/${id}`);
}

const BotBuilderService = new BotBuilder();
export default BotBuilderService;
