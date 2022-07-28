import React, { Fragment, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Nav from "./components/Nav";
import SettingButton from "./components/SettingButton";
import Logo from "./components/Logo";

interface Props {
  mobileNavsidebar: boolean;
}

const DashboardSideDrawer: React.FC<Props> = ({ mobileNavsidebar }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();
  const sidebarRef = useRef(null);
  //   const sidebarOutsideClick = OutsideClick(sidebarRef);
  const selectedKeys: string = router.pathname;
  const openKeys: string = router.pathname.split("/")[3];

  const onSelect = ({ key }) => {
    router.push(`${key}`);
  };

  const onFinish = (values) => {
    router.push(
      "/dashboard/chatflows/[id]",
      `/dashboard/chatflows/${values.name}`
    );
  };

  const handleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const logout = () => {
    router.push("/");
  };

  return (
    <>
      <aside
        className={`${
          mobileNavsidebar ? "block" : "hidden"
        } side-drawer sm:w-14 sm:flex sm:flex-col z-50 md:w-16 ltr:pl-2 rtl:pr-2`}
        ref={sidebarRef}
      >
        <div className="flex-grow flex flex-col justify-between ">
          <Logo />
          <Nav />
          <SettingButton />
        </div>
      </aside>
      {/* <Modal
        title="New Chat Flow"
        visible={isModalVisible}
        footer={false}
        onCancel={handleModal}
      >
        <Form
          form={form}
          layout="vertical"
          name="newChatFlowForm"
          size="large"
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input Name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item className=" mt-32">
            <Button type="primary" htmlType="submit" block>
              GO!
            </Button>
          </Form.Item>
        </Form>
      </Modal> */}
    </>
  );
};

export default DashboardSideDrawer;
