import { ConfigProvider, Layout } from "antd";
import { ReactNode } from "react";
import LandingHeader from "./components/LandingHeader";
import fa_IR from "antd/lib/locale/fa_IR";
import LandingFooter from "./components/LandingFooter";
import Head from "next/head";

const { Footer, Content } = Layout;

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
    title
}) => {
    return (
        <ConfigProvider direction="ltr">
            <Head>
                <title>{title}</title>
                {meta && <meta name={meta.name} content={meta.content} />}
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout className="landingLayout">
                <LandingHeader />
                <Content>{children}</Content>
                <Footer id="about-us">
                    <LandingFooter />
                </Footer>
            </Layout>
        </ConfigProvider>
    );
};

export default LandingLayout;
