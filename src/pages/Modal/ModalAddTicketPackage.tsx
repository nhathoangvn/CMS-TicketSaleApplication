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
import React, { useState } from "react";
import "./ModalUpdateTicketPackage.scss";
interface IModalAddTicketPackageProps {
  isVisibleShowModal: boolean;
  hanldeCloseModal: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleOnclickAddTicketPackage: (
    e: React.MouseEvent<HTMLButtonElement>,
    ticketPackage: any
  ) => void;
}
type ticketPackage = {
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
const ModalAddTicketPackage: React.FC<IModalAddTicketPackageProps> = ({
  hanldeCloseModal,
  handleOnclickAddTicketPackage,
  isVisibleShowModal,
}) => {
  const [ticketPackage, setTicketPackage] = useState<ticketPackage>({
    giaCombo: "",
    giaVe: "",
    maGoi: "ALT20210501",
    slVe: 0,
    tenGoiVe: "",
    tinhTrang: true,
    ngayApDung: "",
    ngayHetHan: "",
  });
  return (
    <Modal
      className="modal__add_ticket-package"
      visible={isVisibleShowModal}
      footer={null}
      closable={false}
    >
      <Form layout="vertical">
        <Row>
          <Col span={24} className="title">
            <span>Thêm gói vé</span>
          </Col>
          <Col span={24}>
            <Form.Item
              label={
                <span>
                  Tên gói vé <span style={{ color: "red" }}>*</span>
                </span>
              }
            >
              <Input
                className="ten-goi-ve"
                placeholder="Nhập tên gói vé"
                onChange={(e) =>
                  setTicketPackage({
                    ...ticketPackage,
                    tenGoiVe: e.target.value,
                  })
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Ngày áp dụng">
              <Space>
                <DatePicker
                  placeholder="dd/mm/yy"
                  onChange={(date: any, dateString: string) =>
                    setTicketPackage({
                      ...ticketPackage,
                      ngayApDung: `${dateString} 00:00:00`,
                    })
                  }
                />
                <TimePicker placeholder="hh:mm:ss" />
              </Space>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Ngày hết hạn">
              <Space>
                <DatePicker
                  placeholder="dd/mm/yy"
                  onChange={(date: any, dateString: string) =>
                    setTicketPackage({
                      ...ticketPackage,
                      ngayHetHan: `${dateString} 00:00:00`,
                    })
                  }
                />
                <TimePicker placeholder="hh:mm:ss" />
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
                  <Input
                    className="input-giaVe"
                    onChange={(e) =>
                      setTicketPackage({
                        ...ticketPackage,
                        giaVe: e.target.value,
                      })
                    }
                  />
                  <span>{`/vé`}</span>
                </Space>
              </Row>
              <Row className="giaVeApDung" align="middle">
                <Space size={8}>
                  <Checkbox value="veCombo">Combo vé với giá</Checkbox>
                  <Input
                    className="input-giaVe"
                    onChange={(e) =>
                      setTicketPackage({
                        ...ticketPackage,
                        giaCombo: e.target.value,
                      })
                    }
                  />
                  <span>/</span>
                  <Input
                    className="input-soVe"
                    onChange={(e) =>
                      setTicketPackage({
                        ...ticketPackage,
                        slVe: parseInt(e.target.value),
                      })
                    }
                  />
                  <span>vé</span>
                </Space>
              </Row>
            </Form.Item>
          </Col>
          <Col className="container-tinh-trang">
            <Form.Item label="Tình trạng">
              <Select
                className="select-tinhTrang"
                defaultValue={true}
                onChange={(value) =>
                  setTicketPackage({ ...ticketPackage, tinhTrang: value })
                }
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
                  hanldeCloseModal(event)
                }
              >
                Huỷ
              </Button>
              <Button
                className="btn-add"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                  handleOnclickAddTicketPackage(event, ticketPackage)
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

export default ModalAddTicketPackage;
