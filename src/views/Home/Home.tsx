import { Layout } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import SiderMenu from "./components/SiderMenu/SiderMenu";
import "./Home.scss";
const Home: React.FC = () => {
  return (
    <Layout className="home__page">
      <Layout.Sider theme="light" width={318} className="sider__menu">
        <SiderMenu />
      </Layout.Sider>
      <Layout>
        <Layout.Header className="header">
          <Header />
        </Layout.Header>
        <Layout.Content className="content">
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default Home;
