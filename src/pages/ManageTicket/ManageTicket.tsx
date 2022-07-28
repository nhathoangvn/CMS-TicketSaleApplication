import {
  Badge,
  Button,
  Checkbox,
  Col,
  DatePicker,
  Input,
  Modal,
  Radio,
  Row,
  Space,
  Table,
  Tag,
  Tooltip,
} from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import React, { ChangeEvent, useEffect, useState } from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { FiFilter, FiMoreVertical } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { TicketCreator } from "../../redux";
import * as XLSX from "xlsx";

import {
  ticketRemainingSelector,
  filterByCongCheckInSelector,
} from "../../redux/selectors/TicketSelector";
import ModalChangeDateUseTicket from "../Modal/ModalChangeDateUseTicket";
import "./ManageTicket.scss";
type typeStatus = "Đã sử dụng" | "Hết hạn" | "Chưa sử dụng";
const plainOptions = ["Cổng 1", "Cổng 2", "Cổng 3", "Cổng 4", "Cổng 5"];
type ticket = {
  key?: string;
  bookingCode?: string;
  soVe: string;
  tenSuKien: string;
  ngaySuDung: string;
  ngayXuatVe?: string;
  congCheckIn?: string;
};
const ManageTicket: React.FC = () => {
  const [isVisibleModalFilter, setIsVisibleModalFilter] =
    useState<boolean>(false);
  const [
    isVisibleModalChangeDateUseTicket,
    setIsVisibleModalChangeDateUseTicket,
  ] = useState(false);
  const [filterByStatus, setFilterByStatus] = useState<string>("all");
  const [ticketSelected, setTicketSelected] = useState<ticket>({
    ngaySuDung: "",
    soVe: "",
    tenSuKien: "",
    bookingCode: "",
    congCheckIn: "",
    key: "",
    ngayXuatVe: "",
  });
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState<boolean>(false);
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const { getData, search, filterByTinhTrang, filterByCongCheckIn } =
    bindActionCreators(TicketCreator, dispatch);
  useEffect(() => {
    getData();
  }, []);

  const ticketList = useSelector(ticketRemainingSelector);
  function getStatusRender(status: typeStatus) {
    switch (status) {
      case "Hết hạn":
        return (
          <Tag color="#F8EBE8" style={{ borderColor: "#FD5959" }}>
            <Badge color="#FD5959" />{" "}
            <span style={{ color: "#FD5959" }}>Hết hạn</span>
          </Tag>
        );
      case "Chưa sử dụng":
        return (
          <Tag color="#DEF7E0" style={{ borderColor: "#03AC00" }}>
            <Badge color="#03AC00" />
            <span style={{ color: "#03AC00" }}>Chưa sử dụng</span>
          </Tag>
        );
      case "Đã sử dụng":
        return (
          <Tag color="#EAF1F8" style={{ borderColor: "#919DBA" }}>
            <Badge color="#919DBA" />
            <span style={{ color: "#919DBA" }}>Đã sử dụng</span>
          </Tag>
        );
    }
  }
  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      render: (key: any, record: any, index: number) => (
        <span>{index + 1}</span>
      ),
    },
    {
      title: "Booking code",
      dataIndex: "bookingCode",
    },
    {
      title: "Số vé",
      dataIndex: "soVe",
    },
    {
      title: "Tên sự kiện",
      dataIndex: "tenSuKien",
    },
    {
      title: "Tình trạng sử dụng",
      dataIndex: "tinhTrang",
      render: (tinhTrang: typeStatus) => (
        <Row>{getStatusRender(tinhTrang)}</Row>
      ),
    },
    {
      title: "Ngày sử dụng",
      dataIndex: "ngaySuDung",
      key: "key",
    },
    {
      title: "Ngày xuất vé",
      dataIndex: "ngayXuatVe",
    },
    {
      title: "Cổng check-in",
      dataIndex: "congCheckIn",
      render: (text: any, record: any, index: any) => (
        <Row>
          {record.tinhTrang !== "Chưa sử dụng" ? (
            <span>{text}</span>
          ) : (
            <Row style={{ width: "100%" }} justify="space-between">
              <span>---</span>
              <Tooltip
                placement="left"
                trigger="click"
                title={
                  <Row
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: "8px",
                      background: "#FFD2A8",
                    }}
                  >
                    <span className="tooltip">Sử dụng vé</span>
                    <span
                      className="tooltip"
                      onClick={() => {
                        setIsVisibleModalChangeDateUseTicket(true);
                        setTicketSelected(record);
                      }}
                    >
                      Đổi ngày sử dụng
                    </span>
                  </Row>
                }
              >
                <FiMoreVertical size={20} />
              </Tooltip>
            </Row>
          )}
        </Row>
      ),
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
  const handleOnClickFilter = () => {
    setDisabled(false);
    setFilterByStatus("all");
    filterByCongCheckIn(ListCongCheckIn);
    filterByTinhTrang(filterByStatus);
    setIsVisibleModalFilter(false);
  };

  const ListCongCheckIn = new Set<string>();
  const HandleChecked = (value: string, checked: boolean) => {
    if (ListCongCheckIn.has(value) || !checked) {
      ListCongCheckIn.delete(value);
      return;
    }
    ListCongCheckIn.add(value);
  };
  const handleOnchange = (item: CheckboxChangeEvent) => {
    HandleChecked(item.target.value, item.target.checked);
  };

  const handleCloseModal = () => {
    setIsVisibleModalChangeDateUseTicket(false);
  };
  const handleOnChangeFilterBySearchText = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    search(e.target.value);
  };
  return (
    <React.Fragment>
      <Row className="manage__ticket">
        <Col span={24} className="manage__ticket-title">
          <span>Danh sách vé</span>
        </Col>
        <Col span={24}>
          <Row justify="space-between" className="manage__ticket-filter">
            <Input
              suffix={<BiSearch size={20} />}
              placeholder="Tìm bằng số vé"
              onChange={(e) => handleOnChangeFilterBySearchText(e)}
            />
            <Space>
              <Button
                icon={<FiFilter size={20} />}
                onClick={() => setIsVisibleModalFilter(true)}
              >
                Lọc vé
              </Button>
              <Button
                onClick={() => {
                  const downloadExcel = () => {
                    const workSheet = XLSX.utils.json_to_sheet(ticketList);
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
                style={{ width: 181 }}
              >{`Xuất file (.csv)`}</Button>
            </Space>
          </Row>
        </Col>
        <Col span={24} className="manage__ticket-table">
          <Table
            key="key"
            style={{ height: 624 }}
            columns={columns}
            dataSource={ticketList}
            pagination={{ pageSize: 12, itemRender: itemPagination }}
          />
        </Col>
      </Row>
      <Row className="modal__filter-ticket">
        <Modal
          className="modal__filter-ticket"
          visible={isVisibleModalFilter}
          onCancel={() => setIsVisibleModalFilter(false)}
          footer={null}
          closable={false}
          destroyOnClose={true}
        >
          <Row className="modal__filter-ticket-container">
            <Col span={24} className="title">
              <span>Lọc Vé</span>
            </Col>
            <Col span={12} className="date-picker">
              <span>Từ ngày</span>
              <DatePicker format="DD/MM/YYYY" />
            </Col>
            <Col span={12} className="date-picker">
              <span>Đến ngày</span>
              <DatePicker format="DD/MM/YYYY" />
            </Col>
            <Col span={24} className="radio-status">
              <span className="label">Tình trạng sử dụng</span>
              <Radio.Group
                size="large"
                buttonStyle="solid"
                defaultValue="all"
                onChange={(e) => setFilterByStatus(e.target.value)}
              >
                <Space size={30}>
                  <Radio value="all">Tất cả</Radio>
                  <Radio value="Đã sử dụng">Đã sử dụng</Radio>
                  <Radio value="Chưa sử dụng">Chưa sử dụng</Radio>
                  <Radio value="Hết hạn">Hết hạn</Radio>
                </Space>
              </Radio.Group>
            </Col>
            <Col span={24} className="check-box">
              <span className="label">Cổng Check - in</span>
              <Row gutter={24}>
                <Col span={8}>
                  <Checkbox
                    onChange={(e) => {
                      e.target.checked ? setDisabled(true) : setDisabled(false);
                      ListCongCheckIn.clear();
                    }}
                    value="all"
                  >
                    Tất cả
                  </Checkbox>
                </Col>
                {plainOptions.map((item: string) => (
                  <Col span={8} key={item}>
                    <Checkbox
                      onChange={(e) => {
                        handleOnchange(e);
                      }}
                      disabled={disabled}
                      value={item}
                    >
                      {item}
                    </Checkbox>
                  </Col>
                ))}
              </Row>
            </Col>
            <Col span={24} className="btn-filter">
              <Button onClick={handleOnClickFilter}>Lọc</Button>
            </Col>
          </Row>
        </Modal>
      </Row>
      <Row className="modal__change__date">
        <ModalChangeDateUseTicket
          ticket={ticketSelected}
          isVisibleShowModal={isVisibleModalChangeDateUseTicket}
          handleCloseModal={handleCloseModal}
        />
      </Row>
    </React.Fragment>
  );
};

export default ManageTicket;
