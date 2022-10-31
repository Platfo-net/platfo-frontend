import { IMenu } from '@/types/global';
import { Path } from '@/constants/enums';

type Menu = {
  [x: string]: IMenu[];
};
export const sidebarMenu: Menu = {
  products: [
    {
      key: 'home',
      path: Path.Home,
      isDisable: true,
      type: 'link',
      color: 'secondary',
      icon: 'Home',
    },
    {
      key: 'chatbot',
      path: Path.Chatbot,
      type: 'link',
      color: 'chatbot',
      icon: 'Chatbot',
      isDisable: true,
    },
    {
      key: 'liveChat',
      path: Path.LiveChat,
      isDisable: true,
      type: 'link',
      color: 'liveChat',
      icon: 'LiveChat',
    },
  ],
  tools: [
    {
      key: 'connections',
      path: Path.Accounts,
      type: 'link',
      color: 'secondary',
      icon: 'ChartConnected',
    },
    {
      key: 'profile',
      path: Path.Profile,
      isDisable: true,
      type: 'link',
      color: 'secondary',
      icon: 'Portrait',
    },
    {
      key: 'theme',
      path: 'theme',
      type: 'button',
      color: 'secondary',
      icon: 'Moon',
    },
    {
      key: 'logout',
      path: 'logout',
      type: 'button',
      color: 'secondary',
      icon: 'SignOutAlt',
    },
  ],
};

export const accountsMenu: IMenu[] = [
  {
    key: 'accounts',
    path: Path.Accounts,
  },
];

export const chatbotMenu: IMenu[] = [
  {
    key: 'chatbot',
    path: Path.Chatbot,
  },
  {
    key: 'archive',
    path: Path.Archive,
    isDisable: true,
  },
  {
    key: 'contacts',
    path: Path.Contacts,
    isDisable: true,
  },
];