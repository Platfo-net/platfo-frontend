import { NextPage } from 'next';
import { ComponentType, ReactElement, ReactNode } from 'react';

import common from '../public/locales/en/common.json';

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (_page: ReactElement) => ReactNode;
  layout?: ComponentType;
};

export interface Resources {
  common: typeof common;
}
