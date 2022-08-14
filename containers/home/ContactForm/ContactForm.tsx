import { UserOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";
import _t from "helpers/text";
import { useEffect, useState } from "react";
import Input from "components/Input/Input";

type ContactFormProps = {};

const ContactForm: React.FC<ContactFormProps> = () => {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({});

  // To disable submit button at the beginning.
  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      form={form}
      name="basic"
      layout="inline"
      // wrapperCol={{ span: 8 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        className="m-4"
        name="fullname"
        rules={[{ required: true, message: _t("erorr-enter-fullname") }]}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder={_t("fullname")}
          className="bg-white rounded-2xl"
        />
      </Form.Item>

      <Form.Item
        className="m-4"
        name="phone-number"
        rules={[{ required: true, message: _t("erorr-enter-phone-number") }]}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder={_t("phone-number")}
          className="bg-white rounded-2xl"
        />
      </Form.Item>

      <Form.Item className="mt-6 mx-4">
        <button className="primary" htmlType="submit">
          {_t("submit")}
        </button>
      </Form.Item>
    </Form>
  );
};

export default ContactForm;
