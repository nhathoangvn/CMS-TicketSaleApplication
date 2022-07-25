import { Col, ConfigProvider, DatePicker, Row, Space } from "antd";
import React from "react";
import "./Statistic.scss";
import locale from "antd/es/locale/vi_VN";
import "moment/locale/vi";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJs,
  Tooltip as TTooltip,
  Title,
  ArcElement,
  Legend,
} from "chart.js";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
ChartJs.register(TTooltip, Title, ArcElement, Legend);

const Statistic: React.FC = () => {
  const dataChart = [
    {
      timePeriod: "Thứ 2",
      value: 140,
    },
    {
      timePeriod: "Thứ 3",
      value: 180,
    },
    {
      timePeriod: "Thứ 4",
      value: 160,
    },
    {
      timePeriod: "Thứ 5",
      value: 240,
    },
    {
      timePeriod: "Thứ 6",
      value: 200,
    },
    {
      timePeriod: "Thứ 7",
      value: 240,
    },
    {
      timePeriod: "CN",
      value: 170,
    },
  ];
  const dataFamily = {
    labels: undefined,
    datasets: [
      {
        label: undefined,
        data: [13568, 56024],
        backgroundColor: ["#FF8A48", "#4F75FF"],
      },
    ],
  };
  const dataEvent = {
    labels: undefined,
    datasets: [
      {
        label: undefined,
        data: [28302, 30256],
        backgroundColor: ["#FF8A48", "#4F75FF"],
      },
    ],
  };
  return (
    <Row className="statistic">
      <Col span={24} className="statistic-title">
        <span>Thống kê</span>
      </Col>
      <Col span={24} className="statistic-content">
        <Row
          justify="space-between"
          align="middle"
          className="statistic-content-title"
        >
          <span>Doanh thu</span>
          <ConfigProvider locale={locale}>
            <DatePicker picker="month" format={"MMMM, YYYY"} />
          </ConfigProvider>
        </Row>
      </Col>
      <Col span={24} className="statistic-content-chart">
        <Row className="statistic-content-chart-container">
          <AreaChart width={1508} height={238} data={dataChart}>
            <defs>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="orange" stopOpacity={0.2} />
                <stop offset="95%" stopColor="orange" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke="orange"
              fillOpacity={1}
              fill="url(#colorPv)"
            />
            <XAxis dataKey="timePeriod" />
            <YAxis min={0} max={10000} />
            <CartesianGrid strokeDasharray="3 3" />
          </AreaChart>
        </Row>
      </Col>
      <Col span={24} className="statistic-content-doanhthu">
        <span style={{ fontSize: "14px", color: "#1e0d83", opacity: 0.5 }}>
          Tổng doanh thu theo tuần
        </span>
        <span style={{ fontSize: "24px", color: "#1e0d83", fontWeight: 600 }}>
          525.145.000
          <span style={{ fontSize: "14px", color: "#1e0d83" }}> đồng</span>
        </span>
      </Col>

      <Col span={24} className="statistic-content-chart-donut">
        <Row className="statistic-content-chart-donut-container">
          <Col span={4} className="statistic-content-chart-donut-title">
            <ConfigProvider locale={locale}>
              <DatePicker picker="month" format={"MMMM, YYYY"} />
            </ConfigProvider>
          </Col>
          <Col span={6}>
            <Row
              align="middle"
              justify="center"
              className="statistic-content-chart-donut-wrapper"
            >
              <span>Gói gia đình</span>
              <div className="chart-donut">
                <Doughnut data={dataFamily} />
              </div>
            </Row>
          </Col>
          <Col span={6}>
            <Row
              align="middle"
              justify="center"
              className="statistic-content-chart-donut-wrapper"
            >
              <span>Gói sự kiện</span>
              <div className="chart-donut">
                <Doughnut data={dataEvent} />
              </div>
            </Row>
          </Col>
          <Col span={8} className="chart-donut-tooltip">
            <Space size={20} className="chart-donut-tooltip-space">
              <div className="ve-da-su-dung" />
              <span>Vé đã sử dụng</span>
            </Space>
            <Space size={20} className="chart-donut-tooltip-space">
              <div className="ve-chua-su-dung" />
              <span>Vé chưa sử dụng</span>
            </Space>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Statistic;
