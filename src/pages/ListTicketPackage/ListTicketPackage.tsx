import { Badge, Button, Col, Input, Row, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import { BiEdit, BiSearch } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { TicketPackageCreator } from "../../redux";
import { ticketPackageRemainingSelector } from "../../redux/selectors/TicketPackageSelector";
import ModalAddTicketPackage from "../Modal/ModalAddTicketPackage";
import ModalUpdateTicketPackage from "../Modal/ModalUpdateTicketPackage";
import * as XLSX from "xlsx";

import "./ListTicketPackage.scss";
const ListTicketPackage: React.FC = () => {
  const [isVisibleModalAdd, setIsVisibleModalAdd] = useState<boolean>(false);
  const [isVisibleModalUpdate, setIsVisibleModalUpdate] =
    useState<boolean>(false);
  const [ticketPackageSelected, setTicketPackageSelected] = useState<any>({});
  const handleOnclickAddTicketPackage = (item: any) => {
    addTicketPackage(item);
    setIsVisibleModalAdd(false);
    getData();
  };
  const handleOnClickCloseModalUpdate = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    setIsVisibleModalUpdate(false);
    setTicketPackageSelected({});
  };
  const hadnleOnClickUpdateTicketPackage = (ticket: any) => {
    updateTicketPackage(ticketPackageSelected?.id, ticket);
    getData();
    setIsVisibleModalUpdate(false);
    console.log(ticket);
  };
  const handleOnClickUpdateTicketPackageSelected = (item: any) => {
    setTicketPackageSelected(item);
  };
  const dispatch = useDispatch();
  const { getData, filterBySearchText, updateTicketPackage, addTicketPackage } =
    bindActionCreators(TicketPackageCreator, dispatch);
  const ticketPackageList = useSelector(ticketPackageRemainingSelector);

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: "STT",
      dataIndex: "maGoi",
      render: (dataIndex: any, record: any, index: number) => (
        <span>{index + 1}</span>
      ),
    },
    {
      title: "Mã gói",
      dataIndex: "maGoi",
    },
    {
      title: "Tên gói vé",
      dataIndex: "tenGoiVe",
    },
    {
      title: "Ngày áp dụng",
      dataIndex: "ngayApDung",
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "ngayHetHan",
    },
    {
      title: "Giá vé (VNĐ/vé)",
      dataIndex: "giaVe",
    },
    {
      title: "Giá combo (VNĐ/combo)",
      dataIndex: "giaCombo",
    },
    {
      title: "Tình trạng",
      dataIndex: "tinhTrang",
      render: (dataIndex: boolean, record: any, index: any) => (
        <Row>
          {dataIndex ? (
            <Tag className="dang-ap-dung">
              <Badge color="#03AC00" text="Đang áp dụng" />
            </Tag>
          ) : (
            <Tag className="tat">
              <Badge color="red" text="Tắt" />
            </Tag>
          )}
        </Row>
      ),
    },
    {
      title: "",
      dataIndex: "key",
      render: (dataIndex: string, record: any, index: any) => (
        <Row
          align="middle"
          justify="center"
          style={{ height: "100%", cursor: "pointer" }}
          onClick={() => {
            setTicketPackageSelected(record);
            setIsVisibleModalUpdate(true);
          }}
        >
          <BiEdit size={20} style={{ color: "#FF993C" }} />
          <span
            style={{
              paddingLeft: "8px",
              color: "#FF993C",
              fontSize: "14px",
              fontWeight: 500,
            }}
          >
            Cập nhật
          </span>
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
  return (
    <React.Fragment>
      <Row className="ticket__package">
        <Col span={24} className="ticket__package-title">
          <span>Danh sách đối vé</span>
        </Col>
        <Col span={24} className="ticket__package-filter">
          <Input
            className="input-search"
            suffix={<BiSearch size={20} />}
            placeholder="Tìm bằng số vé"
            onChange={(e) => filterBySearchText(e.target.value)}
          />
          <Space size={24}>
            <Button
              className="btn-export"
              onClick={() => {
                const downloadExcel = () => {
                  const workSheet = XLSX.utils.json_to_sheet(ticketPackageList);
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

                  XLSX.writeFile(workBook, "DanhSachGoiVe.xlsx");
                };
                downloadExcel();
              }}
            >{`Xuất file (.csv)`}</Button>
            <Button
              className="btn-add"
              onClick={() => setIsVisibleModalAdd(true)}
            >
              Thêm gói vé
            </Button>
          </Space>
        </Col>
        <Col span={24} className="ticket__package-table">
          <Table
            columns={columns}
            pagination={{ pageSize: 12, itemRender: itemPagination }}
            dataSource={ticketPackageList}
          />
        </Col>
      </Row>
      <ModalAddTicketPackage
        hanldeCloseModal={() => setIsVisibleModalAdd(false)}
        handleOnclickAddTicketPackage={(e, ticketPackage) =>
          handleOnclickAddTicketPackage(ticketPackage)
        }
        isVisibleShowModal={isVisibleModalAdd}
      />
      <ModalUpdateTicketPackage
        ticket={ticketPackageSelected}
        isVisibleShowModal={isVisibleModalUpdate}
        handleOnClickClose={handleOnClickCloseModalUpdate}
        handleOnclickUpdateTicketPackage={(e, ticket) =>
          hadnleOnClickUpdateTicketPackage(ticket)
        }
      />
    </React.Fragment>
  );
};

export default ListTicketPackage;
