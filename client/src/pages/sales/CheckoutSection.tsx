import { Button, Col, Flex, InputNumber, Modal, Row, Select } from "antd";
import { calculateTotalAmount, calculateTotalItems } from "../../utils";
import { SelectedProduct } from "./NewSale";
import { useState } from "react";
import Title from "antd/es/typography/Title";
import { Payment } from "../../types";

interface Props {
  selectedProducts: SelectedProduct[];
}

export const CheckoutSection = ({ selectedProducts }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmAmount, setConfirmAmount] = useState<number | null>(0);
  const [paymentMethod, setPaymentMethod] = useState<Payment>(Payment.CASH);
  const totalAmount = calculateTotalAmount(selectedProducts);
  const totalItems = calculateTotalItems(selectedProducts);

  const handleChange = (value: Payment) => {
    setPaymentMethod(value);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleProceed = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Flex
      vertical
      gap={16}
      style={{ backgroundColor: "#dfdfdf", borderRadius: 3 }}
    >
      <Flex vertical gap={16} style={{ padding: "16px 16px 0" }}>
        <Row>
          <Col span={12} style={{ textAlign: "left", fontWeight: "bold" }}>
            TOTAL ITEMS
          </Col>

          <Col span={12} style={{ textAlign: "right", fontWeight: 600 }}>
            {totalItems}
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ textAlign: "left", fontWeight: "bold" }}>
            TOTAL AMOUNT
          </Col>

          <Col span={12} style={{ textAlign: "right", fontWeight: 600 }}>
            {totalAmount}
          </Col>
        </Row>
      </Flex>

      <Button
        style={{
          width: "100%",
        }}
        type="primary"
        onClick={showModal}
      >
        Checkout {totalAmount}
      </Button>
      <Modal
        closable={false}
        title={<Title level={4}>Amount to Pay : {totalAmount} MMK</Title>}
        open={isModalOpen}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            disabled={confirmAmount !== totalAmount}
            onClick={handleProceed}
          >
            Proceed
          </Button>,
        ]}
      >
        <Flex vertical gap={20} style={{ padding: "20px 0" }}>
          <Flex align="center" justify="space-between">
            <Title level={5}>Payment Method : </Title>
            <Select
              value={paymentMethod}
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                { value: Payment.CASH, label: "Cash" },
                { value: Payment.KPAY, label: "Kpay" },
              ]}
            />
          </Flex>

          <Flex align="center" justify="space-between">
            <Title level={5}>Confirm Amount : </Title>
            <InputNumber
              value={confirmAmount}
              status={confirmAmount !== totalAmount ? "error" : ""}
              style={{ width: 120 }}
              onChange={(value) => setConfirmAmount(value)}
            />
          </Flex>
        </Flex>
      </Modal>
    </Flex>
  );
};
