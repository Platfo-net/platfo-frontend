import { Col, Row, Typography } from "antd";

const {Title, Text} = Typography;

type AdvantagesCardProps = {
    data : {
        title: string,
        icon: any,
        description: string
    }
   
}
 
const AdvantagesCard:React.FC<AdvantagesCardProps> = ({data}) => {
    return (
        <Row className="advantagesCard  p-8">
            <Col span={24} className="icon mb-16">
                {data.icon}
            </Col>
            <Col span={24}>
            <Title level={5} className="dark">{data.title} </Title>
            </Col>
            <Col span={24}>
            <Text className="light">{data.description} </Text>
            </Col>
        </Row>
    );
}
 
 
export default AdvantagesCard;