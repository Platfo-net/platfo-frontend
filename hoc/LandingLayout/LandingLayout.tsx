import { ReactNode } from 'react';
import LandingHeader from './components/LandingHeader';
import LandingFooter from './components/LandingFooter';
import Head from 'next/head';

type LandingLayoutProps = {
  children: ReactNode;
  title?: string;
  meta?: {
    name: string;
    content: string;
  };
};

const LandingLayout: NextPage = ({ children, meta, title }) => {
  return (
    <div className="w-full h-full">
      <Head>
        <title>{title}</title>
        {meta && <meta name={meta.name} content={meta.content} />}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="landing-layout h-full w-full">
        <LandingHeader />
        {children}
        <LandingFooter />
      </div>
    </div>
  );
};

export default LandingLayout;
