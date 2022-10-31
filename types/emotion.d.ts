import '@emotion/react';

import { AppTheme } from '@/styles/Themes';

declare module '@emotion/react' {
  export interface Theme extends AppTheme {}
}
