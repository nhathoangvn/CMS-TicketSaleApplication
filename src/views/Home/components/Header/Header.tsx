import { Avatar, Col, Input, Row, Space } from "antd";
import { AiOutlineMail } from "react-icons/ai";
import { BiBell } from "react-icons/bi";
import React from "react";
import { BiSearch } from "react-icons/bi";
const Header: React.FC = () => {
  return (
    <Row className="header-container">
      <Col span={12}>
        <Row align="middle" style={{ height: "100%" }}>
          <Input suffix={<BiSearch size={20} />} placeholder="Search" />
        </Row>
      </Col>
      <Col span={12}>
        <Row justify="end" align="middle" style={{ paddingRight: "32px" }}>
          <Space
            size={27}
            style={{
              height: "85px",
            }}
          >
            <Row align="middle">
              <AiOutlineMail size={20} />
            </Row>
            <Row align="middle">
              <BiBell size={20} />
            </Row>
            <Avatar size={48}>H</Avatar>
          </Space>
        </Row>
      </Col>
    </Row>
  );
};

export default Header;
