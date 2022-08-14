import { Button, Col, Layout, Row, Typography } from "antd";
import landingMenu from "assets/contents/landingMenu";
import _t from "helpers/text";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Logo from "../../../assets/svg/botinow-logo.svg";
import { tokenObj } from "helpers/token";

const { Header } = Layout;
const { Text } = Typography;

type LandingHeaderProps = {};

const LandingHeader: React.FC<LandingHeaderProps> = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();

  const onLogin = () => {
    router.push("/auth/login");
  };

  const onRegister = () => {
    router.push("/auth/register");
  };

  const gotoDashboard = () => {
    router.push("/dashboard/connections/accounts");
  };

  useEffect(() => setIsLoggedIn(tokenObj.getAccessToken()), []);

  return (
    <Header>
      <Row justify="space-between" align="middle">
        <Col
          xs={{ span: 9, order: 1 }}
          md={{ span: 6, order: 1 }}
          className="logo"
        >
          <Link href="/">
            <a href="replace">
              <Logo />

              <Text className="xlg" strong>
                Now
              </Text>
              <Text className="xlg">boti</Text>
            </a>
          </Link>
        </Col>
        <Col
          xs={{ span: 24, order: 3 }}
          md={{ span: 12, order: 2 }}
          className="menu"
        >
          <Row justify="center">
            {landingMenu.map((item) => (
              <Link href={item.path} key={item.path}>
                <a className="mx-4">{item.title}</a>
              </Link>
            ))}
          </Row>
        </Col>
        <Col
          xs={{ span: 12, order: 2 }}
          md={{ span: 6, order: 3 }}
          className="auth"
        >
          {isLoggedIn ? (
            <button className="primary my-auto mx-4" onClick={gotoDashboard}>
              <span
                className="relative "
                style={{ top: "-8px" }}
              >{`Your Panel`}</span>
            </button>
          ) : (
            <>
              <button className="mx-4" onClick={onLogin}>
                <span className="relative " style={{ top: "-8px" }}>
                  {" "}
                  {_t("login")}{" "}
                </span>
              </button>
              <button type="button" className="primary " onClick={onRegister}>
                <span className="relative " style={{ top: "-8px" }}>
                  {_t("register")}
                </span>
              </button>
            </>
          )}
        </Col>
      </Row>
    </Header>
  );
};

export default LandingHeader;
