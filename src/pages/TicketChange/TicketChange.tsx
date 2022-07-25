import { Button, Col, Input, Row, Table } from "antd";
import React from "react";
import {
  AiFillCaretLeft,
  AiFillCaretRight,
  AiOutlineSearch,
} from "react-icons/ai";
import "./TicketChange.scss";
const TicketChange: React.FC = () => {
  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Số vé",
      dataIndex: "soVe",
      key: "ticket",
      // render: (dataIndex: any, record: any, index: any) => (
      //   <span>{dataIndex.map((item: any) => item.soVe).join()}</span>
      // ),

      // render: (ticket: any[]) => (
      //   <Row>
      //     {ticket.map((item: any) => (
      //       <span>{item.soVe}</span>
      //     ))}
      //   </Row>
      // ),
    },
    {
      title: "Ngày sử dụng",
      dataIndex: "ngaySuDung",
      key: "ngaySuDung",
    },
    {
      title: "Tên loại vé",
      dataIndex: "tenLoaiVe",
      key: "tenLoaiVe",
    },
    {
      title: "Cổng check - in",
      dataIndex: "congCheckIn",
      key: "congCheckIn",
    },
    {
      title: "",
      dataIndex: "tinhTrangSoatVe",
      key: "tinhTrangSoatVe",
    },
  ];
  const dataSource = [
    {
      key: "1",
      soVe: "205314876321",
      ngaySuDung: "14/04/2021",
      tenLoaiVe: "Vé cổng",
      congCheckIn: "Cổng 1",
      tinhTrangSoatVe: "Chưa đối soát",
    },
    {
      key: "2",
      soVe: "205314876321",
      ngaySuDung: "14/04/2021",
      tenLoaiVe: "Vé cổng",
      congCheckIn: "Cổng 1",
      tinhTrangSoatVe: "Chưa đối soát",
    },
    {
      key: "3",
      soVe: "205314876321",
      ngaySuDung: "14/04/2021",
      tenLoaiVe: "Vé cổng",
      congCheckIn: "Cổng 1",
      tinhTrangSoatVe: "Chưa đối soát",
    },
    {
      key: "4",
      soVe: "205314876321",
      ngaySuDung: "14/04/2021",
      tenLoaiVe: "Vé cổng",
      congCheckIn: "Cổng 1",
      tinhTrangSoatVe: "Chưa đối soát",
    },
    {
      key: "5",
      soVe: "205314876321",
      ngaySuDung: "14/04/2021",
      tenLoaiVe: "Vé cổng",
      congCheckIn: "Cổng 1",
      tinhTrangSoatVe: "Chưa đối soát",
    },
    {
      key: "6",
      soVe: "205314876321",
      ngaySuDung: "14/04/2021",
      tenLoaiVe: "Vé cổng",
      congCheckIn: "Cổng 1",
      tinhTrangSoatVe: "Chưa đối soát",
    },
    {
      key: "7",
      soVe: "205314876321",
      ngaySuDung: "14/04/2021",
      tenLoaiVe: "Vé cổng",
      congCheckIn: "Cổng 1",
      tinhTrangSoatVe: "Chưa đối soát",
    },
    {
      key: "8",
      soVe: "205314876321",
      ngaySuDung: "14/04/2021",
      tenLoaiVe: "Vé cổng",
      congCheckIn: "Cổng 1",
      tinhTrangSoatVe: "Chưa đối soát",
    },
    {
      key: "9",
      soVe: "205314876321",
      ngaySuDung: "14/04/2021",
      tenLoaiVe: "Vé cổng",
      congCheckIn: "Cổng 1",
      tinhTrangSoatVe: "Chưa đối soát",
    },
    {
      key: "10",
      soVe: "205314876321",
      ngaySuDung: "14/04/2021",
      tenLoaiVe: "Vé cổng",
      congCheckIn: "Cổng 1",
      tinhTrangSoatVe: "Chưa đối soát",
    },
    {
      key: "11",
      soVe: "205314876321",
      ngaySuDung: "14/04/2021",
      tenLoaiVe: "Vé cổng",
      congCheckIn: "Cổng 1",
      tinhTrangSoatVe: "Chưa đối soát",
    },
    {
      key: "12",
      soVe: "205314876321",
      ngaySuDung: "14/04/2021",
      tenLoaiVe: "Vé cổng",
      congCheckIn: "Cổng 1",
      tinhTrangSoatVe: "Chưa đối soát",
    },
    {
      key: "13",
      soVe: "205314876321",
      ngaySuDung: "14/04/2021",
      tenLoaiVe: "Vé cổng",
      congCheckIn: "Cổng 1",
      tinhTrangSoatVe: "Chưa đối soát",
    },
    {
      key: "14",
      soVe: "205314876321",
      ngaySuDung: "14/04/2021",
      tenLoaiVe: "Vé cổng",
      congCheckIn: "Cổng 1",
      tinhTrangSoatVe: "Chưa đối soát",
    },
    {
      key: "15",
      soVe: "205314876321",
      ngaySuDung: "14/04/2021",
      tenLoaiVe: "Vé cổng",
      congCheckIn: "Cổng 1",
      tinhTrangSoatVe: "Chưa đối soát",
    },
  ];
  function itemPagination(current: any, type: any, orginalElement: any) {
    if (type === "prev") {
      return <AiFillCaretLeft color="#A9A9B0" />;
    } else if (type === "next") {
      return <AiFillCaretRight color="#A9A9B0" />;
    }
    return orginalElement;
  }
  return (
    <Row className="ticket__change" justify="space-between">
      <Col span={16} className="ticket__change-left">
        <Row>
          <Col span={24} className="ticket__change-title">
            <span>Đổi soát vé</span>
          </Col>
          <Col span={24} className="ticket__change-filter">
            <Input
              suffix={<AiOutlineSearch size={20} />}
              placeholder="Tìm bằng số vé"
            />
            <Button className="btn">Chốt đối soát</Button>
          </Col>
          <Col span={24} className="ticket__change-table">
            <Table
              columns={columns}
              dataSource={dataSource}
              pagination={{ pageSize: 12, itemRender: itemPagination }}
            />
          </Col>
        </Row>
      </Col>
      <Col
        span={7}
        style={{ border: "1px solid black", marginRight: "32px" }}
      ></Col>
    </Row>
  );
};

export default TicketChange;
