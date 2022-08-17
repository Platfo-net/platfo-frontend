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

const LandingLayout: React.FC<LandingLayoutProps> = ({
  children,
  meta,
  title,
}) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        {meta && <meta name={meta.name} content={meta.content} />}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="landing-layout">
        <LandingHeader />
        {children}
        <div id="about-us">
          <LandingFooter />
        </div>
      </div>
    </div>
  );
};

export default LandingLayout;
