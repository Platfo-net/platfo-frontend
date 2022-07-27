import { Button, Col, Layout, Row, Typography } from "antd";
import landingMenu from "contents/landingMenu";
import { tokenObj } from "helpers/auth";
import _t from "helpers/text";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Logo from "../../../assets/svg/botinow-logo.svg";
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
        router.push("/dashboard");
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
                            <Text className="xlg">boti</Text>
                            <Text className="xlg" strong>
                                Now
                            </Text>
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
                                <a className="mx-16">{item.title}</a>
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
                        <Button
                            type="primary"
                            size="large"
                            className="my-auto mx-8"
                            onClick={gotoDashboard}
                        >
                            {`Your Panel`}
                        </Button>
                    ) : (
                        <>
                            <Button
                                type="link"
                                className="my-auto mx-8"
                                onClick={onLogin}
                            >
                                {_t("login")}
                            </Button>
                            <Button
                                type="primary"
                                size="large"
                                className="min-w-sm"
                                onClick={onRegister}
                            >
                                {_t("register")}
                            </Button>
                        </>
                    )}
                </Col>
            </Row>
        </Header>
    );
};

export default LandingHeader;
