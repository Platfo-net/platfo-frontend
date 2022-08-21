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
    <div className="flex justify-center items-center">
      <Head>
        <title>{title}</title>
        {meta && <meta name={meta.name} content={meta.content} />}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="landing-layout w-screen h-full  flex flex-col items-center justify-center max-w-screen-2xl">
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
