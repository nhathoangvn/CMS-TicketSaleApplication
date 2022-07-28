import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  TimePicker,
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import "./ModalAddTicketPackage.scss";
type ticketPackage = {
  id?: string;
  giaCombo: string;
  giaVe: string;
  slVe: number;
  key?: string;
  maGoi: string;
  ngayApDung?: string;
  ngayHetHan?: string;
  tenGoiVe: string;
  tinhTrang: boolean;
};
interface IModalUpdateTicketPackageProps {
  ticket: ticketPackage;
  isVisibleShowModal: boolean;
  handleOnClickClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleOnclickUpdateTicketPackage: (
    e: React.MouseEvent<HTMLButtonElement>,
    ticketPackage: ticketPackage
  ) => void;
}
const ModalUpdateTicketPackage: React.FC<IModalUpdateTicketPackageProps> = ({
  handleOnclickUpdateTicketPackage,
  handleOnClickClose,
  isVisibleShowModal,
  ticket,
}) => {
  const [form] = Form.useForm();
  const [ngayApDungValue, setNgayApDungValue] = useState<any>(
    ticket?.ngayApDung
  );
  const [gioNgayApDungValue, setGioNgayApDungValue] = useState(
    ticket?.ngayApDung
  );
  const [ngayHetHanValue, setNgayHetHanValue] = useState("");
  const [gioNgayHetHanValue, setGioNgayHetHanValue] = useState("");
  const [status, setStatus] = useState<boolean>(true);
  const handleOnClickTest = (e: React.MouseEvent<HTMLButtonElement>) => {
    form.validateFields().then(async (value: ticketPackage) => {
      const { maGoi, giaCombo, giaVe, slVe, tenGoiVe } = value;
      handleOnclickUpdateTicketPackage(e, {
        id: ticket?.id,
        maGoi,
        giaCombo,
        giaVe,
        ngayApDung: `${ngayApDungValue} ${gioNgayApDungValue}`,
        ngayHetHan: `${ngayHetHanValue} ${gioNgayHetHanValue}`,
        slVe: slVe,
        tenGoiVe,
        tinhTrang: status,
      });
    });
  };
  useEffect(() => {
    form.setFieldsValue({
      maGoi: ticket?.maGoi,
      tenGoiVe: ticket?.tenGoiVe,
      giaVe: ticket?.giaVe,
      giaCombo: ticket?.giaCombo,
      slVe: ticket?.slVe,
      tinhTrang: ticket?.tinhTrang,
    });
  }, [ticket]);
  return (
    <Modal
      className="modal__update_ticket-package"
      visible={isVisibleShowModal}
      footer={null}
      closable={false}
    >
      <Form layout="vertical" form={form}>
        <Row>
          <Col span={24} className="title">
            <span>Cập nhật thông tin gói vé</span>
          </Col>
          <Col span={12}>
            <Form.Item
              name="maGoi"
              label={
                <span>
                  Mã gói vé <span style={{ color: "red" }}>*</span>
                </span>
              }
            >
              <Input className="ma-goi-ve" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="tenGoiVe" label={<span>Tên sự kiện</span>}>
              <Input className="ten-su-kien" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Ngày áp dụng">
              <Space>
                <DatePicker
                  placeholder="dd/mm/yy"
                  format="DD/MM/YYYY"
                  defaultValue={moment(ticket?.ngayApDung, "YYYY-MM-DD")}
                  onChange={(date: any, dateString: string) => {
                    setNgayApDungValue(dateString);
                  }}
                />

                <TimePicker
                  placeholder="hh:mm:ss"
                  defaultValue={moment(
                    gioNgayApDungValue,
                    "YYYY/MM/DD hh:mm:ss"
                  )}
                  format="hh:mm:ss"
                  onChange={(time: any, timeString: string) => {
                    setGioNgayApDungValue(timeString);
                  }}
                />
              </Space>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Ngày hết hạn">
              <Space>
                <DatePicker
                  placeholder="dd/mm/yy"
                  defaultValue={moment(ticket?.ngayHetHan, "YYYY/MM/DD")}
                  format="DD/MM/YYYY"
                  onChange={(date: any, dateString: string) => {
                    setNgayHetHanValue(dateString);
                  }}
                />
                <TimePicker
                  placeholder="hh:mm:ss"
                  defaultValue={moment(
                    ticket?.ngayHetHan,
                    "YYYY/MM/DD hh:mm:ss"
                  )}
                  format="hh:mm:ss"
                  onChange={(time: any, timeString: string) => {
                    setGioNgayHetHanValue(timeString);
                  }}
                />
              </Space>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Giá vé áp dụng">
              <Row
                className="giaVeApDung"
                align="middle"
                style={{ paddingBottom: "12px" }}
              >
                <Space size={8}>
                  <Checkbox value="veLe">Vé lẻ (vnđ/vé) với giá</Checkbox>
                  <Row align="middle">
                    <Form.Item name="giaVe">
                      <Input className="input-giaVe" />
                    </Form.Item>
                  </Row>
                  <span>{`/vé`}</span>
                </Space>
              </Row>
              <Row className="giaVeApDung" align="middle">
                <Space size={8}>
                  <Checkbox value="veCombo">Combo vé với giá</Checkbox>
                  <Form.Item name="giaCombo">
                    <Input className="input-giaVe" />
                  </Form.Item>
                  <span>/</span>
                  <Form.Item name="slVe">
                    <Input className="input-soVe" />
                  </Form.Item>
                  <span>vé</span>
                </Space>
              </Row>
            </Form.Item>
          </Col>
          <Col className="container-tinh-trang">
            <Form.Item label="Tình trạng" name="tinhTrang">
              <Select
                className="select-tinhTrang"
                onChange={(value) => setStatus(value)}
              >
                <Select.Option value={true}>Đang sử dụng</Select.Option>
                <Select.Option value={false}>Tắt</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={24} className="note">
            <span style={{ color: "red" }}>*</span>
            <span className="text-required">là thông tin bắt buộc</span>
          </Col>
          <Col span={24}>
            <Space
              style={{ display: "flex", justifyContent: "center" }}
              size={32}
            >
              <Button
                className="btn-cancel"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                  handleOnClickClose(event)
                }
              >
                Huỷ
              </Button>
              <Button
                className="btn-add"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                  handleOnClickTest(event)
                }
              >
                Lưu
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ModalUpdateTicketPackage;
