import { CheckOutlined } from "@ant-design/icons";
import { Button, Col, Row, Typography } from "antd";
import _t from "helpers/text";

const { Text } = Typography;

type PriceBoxProps = {
  data: {
    price: number;
    items: string[];
    status: "active" | "disabled" | any;
    type: "gold" | "silver" | "bronze" | any;
  };

  onSubmit: (value: string) => void;
};

const PriceBox: React.FC<PriceBoxProps> = ({ data, onSubmit }) => {
  return (
    <Row justify="center" className={`price-box ${data.status}`}>
      <Col span={12} className={`type ${data.type} mb-5`}>
        <Text>{_t(data.type)}</Text>
      </Col>
      {data.items.map((item) => {
        return (
          <Col span={24} key={item}>
            <CheckOutlined /> <Text>{item}</Text>
          </Col>
        );
      })}
      {data.status !== "disabled" ? (
        <Col span={24} className="price my-4">
          <Text strong> {data.price.toLocaleString()} T</Text>
          <Text className="light sm d-block"> {_t("monthly")} </Text>
        </Col>
      ) : (
        <Col span={24} className="price mt-4 my-5">
          <Text strong> Coming Soon</Text>
        </Col>
      )}
      <Col span={24}>
        <button
          className="w-full secondary"
          disabled={data.status === "disabled"}
          size="large"
        >
          {_t("buy")}
        </button>
      </Col>
    </Row>
  );
};

export default PriceBox;
