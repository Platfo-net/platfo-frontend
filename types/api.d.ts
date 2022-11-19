import { Application, Platform } from '@/constants/enums';

export type Pagination = {
  page: number;
  total_pages: number;
  page_size: number;
  total_count: number;
};

export type Body_Auth_AccessToken = {
  email: string;
  password: string;
};

export type Res_Auth_AccessToken = {
  access_token: string;
  token_type: string;
};

export type Params_Account_All = {
  platform: Platform;
};

export interface IAccount {
  id: string;
  username: string;
  platform: Platform;
  profile_image: string;
  page_id: string;
}
export type Res_Account_All = IAccount[];

export type Body_Instagram = {
  facebook_user_id: string;
  facebook_user_token: string;
};

export interface IInformation {
  website?: string;
  followers_count?: number;
  follows_count?: number;
  biography?: string;
  name?: string;
  username?: string;
  profile_image?: string;
  is_verified_user?: boolean;
  is_user_follow_business?: boolean;
  is_business_follow_user?: boolean;
}

export type Res_Account_Id = {
  id: string;
  facebook_page_id: string;
  facebook_page_token: string;
  instagram_page_id: string;
  instagram_username: string;
  instagram_profile_picture_url: string;
  facebook_user_long_lived_token: string;
  facebook_user_id: string;
  user_id: string;
  username: string;
  platform: string;
  profile_image: string;
  page_id: string;
  information: IInformation;
};

export type Params_Connection_All = {
  account_id: string;
};

export interface IConnection {
  name: string;
  description: string;
  application_name: Application;
  account_id: string;
  id: string;
  account: IAccount;
}

export type Res_Connection_All = IConnection[];

export interface IChatflow {
  id: string;
  name: string;
  is_active: boolean;
  user_id: string;
  created_at: string;
  updated_at: string;
  date?: string;
}
export type Res_BotBuilder_Chatflow_All = IChatflow[];

export interface IParams_Pagination {
  page: number;
  page_size: number;
}

export interface INotification {
  id: string;
  title: string;
  description: string;
  created_at: string;
  is_readed: boolean;
}

export type Body_Livechat_Contact_All_FacebookPageId = {
  field: string;
  operator: string;
  value: number;
}[];

export interface IContact {
  id: string;
  user_id: string;
  contact_igs_id: boolean;
  user_page_id: string;
  comment_count: number;
  message_count: number;
  live_comment_count: number;
  //Todo ask type
  first_impression?: string;
  last_message_at: string;
  information: IInformation;
  last_message?: string;
}
export type Res_LiveChat_Contact_All_PageId = {
  items: IContact[];
  pagination: Pagination;
};

export type Res_LiveChat_Contact_Id = IContact;

export interface IContactGroup {
  id: string;
  name: string;
  description: string;
  contacts: { profile_image: string, username: string }[];
}
export type Res_Postman_Group_FacebookPageId = {
  items: IContactGroup[];
  pagination: Pagination;
};

export type Body_Postman_Group = {
  name: string;
  description: string;
  facebook_page_id: string;
  contacts: {
    contact_igs_id: string;
    contact_id: string;
  }[];
};

export interface ICampaign {
  id: string;
  name: string;
  description: string;
  created_at: string;
  status: string;
  is_draft: boolean;
  group_name: string;
}
export type Res_Postman_Campaign_FacebookPageId = {
  items: ICampaign[];
  pagination: Pagination;
};
