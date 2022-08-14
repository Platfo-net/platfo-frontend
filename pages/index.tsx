import { Button, Col, Row, Typography } from "antd";
import _t from "helpers/text";
import LandingLayout from "hoc/LandingLayout/LandingLayout";
import type { NextPage } from "next";
import landingContents from "assets/contents/landingContents.json";
import IphoneImg from "../assets/img/iphone.png";
import Image from "next/image";
import AdvantagesCard from "components/AdvantagesCard/AdvantagesCard";
import WalletIcon from "../assets/svg/wallet.svg";
import TimeIcon from "../assets/svg/time.svg";
import SatisfyIcon from "../assets/svg/satisfy.svg";
import CostIcon from "../assets/svg/cost.svg";
import ContactForm from "containers/home/ContactForm/ContactForm";
import PricingPanels from "containers/home/PricingPanels/PricingPanels";
// t
const { Text, Title } = Typography;

const Home: NextPage = () => {
  const getContent = (key: string) => {
    let list: { [k: string]: string } = landingContents;
    let text = list[key];
    return text;
  };

  const cards = [
    {
      icon: <TimeIcon />,
      title: "24/7 response",
      description:
        "By building a chatbot with the help of Batinow and connecting it to your social network account, you can intelligently send messages to your customers and contacts and stay in touch with them around the clock.",
    },
    {
      icon: <CostIcon />,
      title: "sales increase",
      description:
        "With the help of Batinow, you can automatically send messages to people who follow a number for the first time and introduce your products or services to them exclusively",
    },
    {
      icon: <WalletIcon />,
      title: "Saving money and time",
      description:
        "With the help of chatbot, many of the messages and questions that your contacts have are answered, and you don't need to spend the whole day answering direct messages.",
    },

    {
      icon: <SatisfyIcon />,
      title: "Satisfying customers",
      description:
        "Batino helps you respond to the requests of your contacts as quickly as possible. In fact, this will make your customers wait less and solve their problems quickly, and this will increase the satisfaction of your customers.",
    },
  ];

  return (
    <LandingLayout title="Botinow">
      <div>
        <main className="main homePage">
          <Row id="intro" className="mb-5 gradient-card">
            <Col md={12} xs={24}>
              <Title level={1} className="dark">
                {getContent("landing-main-title")}
              </Title>
              <Title level={4} className="light">
                {getContent("landing-slogan")}{" "}
              </Title>
              <Text className="light d-block">
                {getContent("landing-description")}{" "}
              </Text>
              <button type="primary" className="primary mt-5">
                {_t("online-demo")}
              </button>
            </Col>
            <Col md={12} xs={24} className="iphone">
              <Image src={IphoneImg} alt="" />
            </Col>
          </Row>
          <Row className="mt-8 sections">
            <Col span={24}>
              <Title level={3} className="dark">
                {getContent("landing-section-2-title")}
              </Title>
            </Col>
            <Col span={24}>
              <Row className="my-5" gutter={[64, 8]}>
                {cards.map((item) => (
                  <Col lg={6} md={12} xs={24} key={item.title}>
                    <AdvantagesCard data={item} />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
          <Row
            gutter={[16, 16]}
            id="support"
            className="blue-gradient-card mt-12"
          >
            <Col md={10} xs={24}>
              <Title level={3} className="dark">
                {getContent("landing-help-title")}
              </Title>
              <Text className="light d-block">
                {getContent("landing-help-description")}{" "}
              </Text>
            </Col>
            <Col md={14} xs={24} className="flex-end">
              <ContactForm />
            </Col>
          </Row>
          <Row id="pricing" gutter={[16, 16]} className="mt-12 sections ">
            <PricingPanels />
          </Row>
        </main>
      </div>
    </LandingLayout>
  );
};

export default Home;
