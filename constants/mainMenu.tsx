import { IMenu } from '@/types/global';
import { Path } from '@/constants/enums';

export const landingMenu: IMenu[] = [
  {
    key: 'contact-us',
    path: Path.ContactUs,
  },
  {
    key: 'about-us',
    path: Path.AboutUs,
  },
  {
    key: 'pricing',
    path: Path.Pricing,
  },
];
