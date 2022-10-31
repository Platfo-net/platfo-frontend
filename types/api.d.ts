import { Application, Platform } from '@/constants/enums';

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
  is_verified_user?: string;
  is_user_follow_business?: string;
  is_business_follow_user?: string;
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

export interface IContact {
  id: string;
  user_id: string;
  contact_igs_id: boolean;
  user_page_id: string;
  last_message_at: string;
  information: IInformation;
  last_message?: string;
}
export type Res_LiveChat_Contact_Page_PageId = IContact[];
