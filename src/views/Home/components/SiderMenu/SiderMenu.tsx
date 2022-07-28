import { Col, Menu, Row } from "antd";
import React from "react";
import { AiOutlineCopyrightCircle, AiOutlineSetting } from "react-icons/ai";
import { BiBookmarkAlt, BiHomeAlt } from "react-icons/bi";
import { HiOutlineTicket } from "react-icons/hi";
import { Link } from "react-router-dom";
import LogoInsight from "../../../../shared/assests/images/insight-05 1.png";
const SiderMenu: React.FC = () => {
  return (
    <Row className="sider__menu-container">
      <Col span={24} className="sider__menu-logo">
        <img src={LogoInsight} alt="" />
      </Col>
      <Col span={24} className="sider__menu-menu">
        <Menu mode="inline">
          <Menu.Item key="trang_chu" icon={<BiHomeAlt size={20} />}>
            <Link to="/">Trang chủ</Link>
          </Menu.Item>
          <Menu.Item key="quan_ly_ve" icon={<HiOutlineTicket size={20} />}>
            <Link to="/manage-ticket"> Quản lý vé</Link>
          </Menu.Item>
          <Menu.Item key="doi_soat_ve" icon={<BiBookmarkAlt size={20} />}>
            <Link to="/ticket-change">Đổi soát vé</Link>
          </Menu.Item>
          <Menu.SubMenu
            icon={<AiOutlineSetting size={20} />}
            title="Cài đặt"
            key="submenu_setting"
          >
            <Menu.Item key="goi_dich_vu">
              <Link to="/list-ticket-package">Gói dịch vụ</Link>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </Col>
      <Col
        span={24}
        style={{
          position: "fixed",
          bottom: 0,
        }}
      >
        <Row
          justify="center"
          align="middle"
          style={{ width: "100%", paddingLeft: "40px" }}
        >
          Copyright <AiOutlineCopyrightCircle /> 2020 Alta Software
        </Row>
      </Col>
    </Row>
  );
};

export default SiderMenu;
