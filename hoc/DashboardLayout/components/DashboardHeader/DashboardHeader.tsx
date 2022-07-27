import React, { useEffect } from "react";
import { Row, Col, Layout, Typography, Select } from "antd";
import FacebookLogin from "./components/FacebookLogin";

const { Header: AntHeader } = Layout;
const { Text } = Typography;
const { Option } = Select;
const DashboardHeader = () => {
    useEffect(() => {}, []);
    return (
        <>
            <AntHeader className="dashboard-header">
                <Row justify="space-between">
                    <Col className="m-8 flex-end">
                        <Select
                            placeholder="Select a Trigger"
                            style={{ width: 200 }}
                        >
                            <Option value="Message">Message</Option>
                            <Option value="Follow">Follow</Option>
                        </Select>
                    </Col>
                    <Col
                        xs={{ span: 9, order: 1 }}
                        md={{ span: 6, order: 1 }}
                        className="mt-8 flex-end"
                    >
                        <FacebookLogin />
                    </Col>
                </Row>
            </AntHeader>
        </>
    );
};

export default DashboardHeader;
