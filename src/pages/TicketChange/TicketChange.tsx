import {
  Button,
  Col,
  DatePicker,
  Input,
  notification,
  Radio,
  Row,
  Table,
} from "antd";
import moment from "moment";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  AiFillCaretLeft,
  AiFillCaretRight,
  AiOutlineSearch,
} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { TicketCreator } from "../../redux";
import { ticketChangeRemainingSelector } from "../../redux/selectors/TicketSelector";
import * as XLSX from "xlsx";

import "./TicketChange.scss";
const TicketChange: React.FC = () => {
  const columns = [
    {
      title: "STT",
      dataIndex: "soVe",
      key: "soVe",
      render: (dataIndex: any, record: any, index: number) => (
        <span>{index + 1}</span>
      ),
    },
    {
      title: "Số vé",
      dataIndex: "soVe",
      key: "ticket",
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
      render: (dataIndex: string, record: any, index: any) => {
        return (
          <Row>
            {dataIndex === "Chưa đối soát" ? (
              <span className="chua-doi-soat">{dataIndex}</span>
            ) : (
              <span className="da-doi-soat">{dataIndex}</span>
            )}
          </Row>
        );
      },
    },
  ];
  const [status, setStatus] = useState("all");
  const [buttonRenderByStatus, setButtonRenderByStatus] = useState("all");
  const [fromDate, setFormDate] = useState("");
  const [toDate, setToDate] = useState("");

  const dispatch = useDispatch();
  const { getData, search, filterByTinhTrangDoiSoat } = bindActionCreators(
    TicketCreator,
    dispatch
  );
  useEffect(() => {
    getData();
  }, []);
  const listTicket = useSelector(ticketChangeRemainingSelector);
  const handleOnChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
    search(e.target.value);
  };
  function itemPagination(current: any, type: any, orginalElement: any) {
    if (type === "prev") {
      return <AiFillCaretLeft color="#A9A9B0" />;
    } else if (type === "next") {
      return <AiFillCaretRight color="#A9A9B0" />;
    }
    return orginalElement;
  }
  const getItem = (status: string) => {
    switch (status) {
      case "all":
        return null;
      case "Chưa đối soát":
        return <Button className="btn">Chốt đối soát</Button>;
      case "Đã đối soát":
        return (
          <Button
            className="btn-export"
            onClick={() => {
              const downloadExcel = () => {
                const workSheet = XLSX.utils.json_to_sheet(listTicket);
                const workBook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workBook, workSheet, "baoCao");
                //Buffer
                let buf = XLSX.write(workBook, {
                  bookType: "xlsx",
                  type: "buffer",
                });
                //Binary string
                XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
                //Downloadvs

                XLSX.writeFile(workBook, "QuanLyVe.xlsx");
              };
              downloadExcel();
            }}
          >
            Xuất file (.csv)
          </Button>
        );
    }
  };
  const handleOnClickFilter = () => {
    if (Date.parse(toDate) > Date.parse(fromDate) || !(toDate && fromDate)) {
      filterByTinhTrangDoiSoat(status);
      setButtonRenderByStatus(status);
    } else {
      notification.error({
        message: "Ngày đến phải lớn ngày đi",
        duration: 2,
      });
    }
  };
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
              onChange={(e) => handleOnChangeSearch(e)}
            />
            {getItem(buttonRenderByStatus)}
          </Col>
          <Col span={24} className="ticket__change-table">
            <Table
              columns={columns}
              dataSource={listTicket}
              pagination={{ pageSize: 12, itemRender: itemPagination }}
            />
          </Col>
        </Row>
      </Col>
      <Col span={7} className="ticket__change-right">
        <Row>
          <Col span={24} className="title">
            <span>Lọc vé</span>
          </Col>
          <Col span={12} className="label-2">
            <span>Tình trạng đối soát</span>
          </Col>
          <Col span={12} className="radio content">
            <Radio.Group
              className="radio"
              size="large"
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            >
              <Radio value="all">Tất cả</Radio>
              <Radio value="Đã đối soát">Đã đối soát</Radio>
              <Radio value="Chưa đối soát">Chưa đối soát</Radio>
            </Radio.Group>
          </Col>
          <Col span={12} className="label">
            <span>Loại vé</span>
          </Col>
          <Col span={12} className="content">
            <span>Vé cổng</span>
          </Col>
          <Col span={12} className="label">
            <span>Từ ngày</span>
          </Col>
          <Col span={12} className="content">
            <DatePicker
              onChange={(value) => {
                if (value) {
                  setFormDate(moment(value).format("YYYY-MM-DD"));
                } else {
                  setFormDate("");
                }
              }}
              format="DD/MM/YYYY"
            />
          </Col>
          <Col span={12} className="label">
            <span>Đến ngày</span>
          </Col>
          <Col span={12} className="content">
            <DatePicker
              onChange={(value) => {
                if (value) {
                  setToDate(moment(value).format("YYYY-MM-DD"));
                } else {
                  setToDate("");
                }
              }}
              format="DD/MM/YYYY"
            />
          </Col>
          <Col span={24} className="filter">
            <Button className="btn-filter" onClick={handleOnClickFilter}>
              Lọc
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default TicketChange;
