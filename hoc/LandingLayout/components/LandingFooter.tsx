import { EnvironmentOutlined } from "@ant-design/icons";
import { Col, Row, Typography } from "antd";
import Map from "components/Map/Map";
import dynamic from "next/dynamic";
import landingContents from "contents/landingContents.json";

const { Title, Paragraph, Text } = Typography;
type LandingFooterProps = {};
const LandingFooter: React.FC<LandingFooterProps> = () => {
    const MapWithNoSSR = dynamic(() => import("../../../components/Map/Map"), {
        ssr: false
    });

    const getContent = (key: string) => {
        let list: { [k: string]: string } = landingContents;
        let text = list[key];
        return text;
    };

    const about = {
        title: "Batinow is a chatbot platform",
        p1: "The purpose of Batinow is to help businesses grow, to make the communication process with their customers smarter, which will increase their sales, save time and money, and also make their customers more satisfied. Batinow is a platform that is very easy to work with and has a lot of features. It has connection and implementation on every page",
        p2: "And about our team and company",
        p3: "At the end of 2021, Batino was able to reject the idea stages and start developing his own product and business. Now our team is about 7 people and it is growing very fast, and we hope to be able to provide more and better services in the future and somehow Let's do our best to serve our people and our country",
        address: "60 Bloor W, Toronto, Ontario, Canada"
    };
    return (
        <Row gutter={[16, 16]}>
            {/*   <Col span={24} className="brands">
                            <Text className="gray center">
                                {getContent("landing-brands_title")}
                            </Text>
                        </Col>
                        <Col span={24}></Col> */}

            <Col md={12} xs={24} className="p-32">
                <Title level={3} className="dark">
                    {about.title}
                </Title>
                <Paragraph className="light">{about.p1}</Paragraph>
                <Paragraph className="light">{about.p2}</Paragraph>
                <Paragraph className="light">{about.p3}</Paragraph>
            </Col>
            <Col md={12} xs={24} className="p-32 mapBox">
                <Paragraph className="light">
                    {" "}
                    <EnvironmentOutlined /> {about.address}
                </Paragraph>
                <MapWithNoSSR />
            </Col>
        </Row>
    );
};

export default LandingFooter;
