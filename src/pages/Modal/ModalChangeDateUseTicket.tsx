import { Button, Col, DatePicker, Form, Modal, Row, Space } from "antd";
import moment from "moment";
import React, { MouseEventHandler, useState } from "react";
import "./ModalChangeDateUseTicket.scss";
const format = "DD/MM/YYYY";
interface IModalChangeDateUseTicketProps {
  ticket: {
    key?: string;
    bookingCode?: string;
    soVe: string;
    tenSuKien: string;
    ngaySuDung: string;
    ngayXuatVe?: string;
    congCheckIn?: string;
  };
  isVisibleShowModal: boolean;
  // handleChangeDate: (isVisible: boolean) => void;
  handleCloseModal: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const ModalChangeDateUseTicket: React.FC<IModalChangeDateUseTicketProps> = ({
  ticket,
  // handleChangeDate,
  handleCloseModal,
  isVisibleShowModal,
}) => {
  const hanleOnClickCloseModal = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    handleCloseModal(event);
  };
  return (
    <Modal
      className="modal__change__date"
      visible={isVisibleShowModal}
      footer={null}
      closable={false}
    >
      <Form>
        <Row align="middle">
          <Col
            span={24}
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "30px",
            }}
          >
            <span className="title">Đổi ngày sử dụng vé</span>
          </Col>
          <Col span={6}>
            <span className="label">Số vé:</span>
          </Col>
          <Col span={18}>
            <span className="content">{ticket.soVe}</span>
          </Col>
          <Col span={6}>
            <span className="label">Số vé:</span>
          </Col>
          <Col span={18}>
            <span className="content">Vé cổng - Gói sự kiện</span>
          </Col>
          <Col span={6}>
            <span className="label">Tên sự kiện:</span>
          </Col>
          <Col span={18}>
            <span className="content">{ticket.tenSuKien}</span>
          </Col>
          <Col span={6}>
            <span className="label">Hạn sử dụng:</span>
          </Col>
          <Col span={18}>
            {/* <span className="content">PKG20210502</span> */}
            <DatePicker
              defaultValue={moment(ticket.ngaySuDung, format)}
              format={format}
            />
          </Col>
          <Col
            span={24}
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "25px",
            }}
          >
            <Space size={24}>
              <Button
                onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                  hanleOnClickCloseModal(e)
                }
                className="btn-cancel"
              >
                Huỷ
              </Button>
              <Button className="btn-save">Lưu</Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ModalChangeDateUseTicket;
