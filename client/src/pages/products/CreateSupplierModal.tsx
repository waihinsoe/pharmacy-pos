import Button from "antd/es/button";
import Flex from "antd/es/flex";
import Input from "antd/es/input";
import message from "antd/es/message";
import Modal from "antd/es/modal";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useAuth } from "../../context/AuthContext";
import Form from "antd/es/form";
import Select from "antd/es/select";
import { Supplier } from "../../types";
import { useCreateSupplier } from "../../hooks/suppliers/useSuppliers";

const { Option } = Select;

export const CreateSupplierModal = () => {
  const { token } = useAuth();

  const [supplierData, setSupplierData] = useState<Supplier>({
    name: "",
    contact_number: "",
    address: "",
  });
  const {
    mutate: createNewSupplier,
    isLoading,
    isSuccess,
  } = useCreateSupplier();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleCreate = () => {
    const { name, contact_number, address } = supplierData;
    const isValid = name && contact_number && address && token;
    if (!isValid) return warning();
    const data = supplierData;
    createNewSupplier({
      data,
      accessToken: token,
    });
  };

  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "Please fill all input!",
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!isLoading && isSuccess) {
      handleOk();
    }
  }, [isLoading, isSuccess]);

  return (
    <>
      {contextHolder}
      <Button
        loading={isLoading}
        type="primary"
        icon={<FaPlus />}
        onClick={showModal}
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        create supplier
      </Button>
      <Modal
        closable={false}
        open={isModalOpen}
        title={<Title level={4}>Create supplier</Title>}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleCreate}>
            Create
          </Button>,
        ]}
      >
        <Flex vertical gap={16}>
          <Input
            placeholder="Enter supplier name"
            allowClear
            value={supplierData.name}
            onChange={(e) =>
              setSupplierData({ ...supplierData, name: e.target.value })
            }
          />

          <Input
            onChange={(e) =>
              setSupplierData({
                ...supplierData,
                contact_number: e.target.value,
              })
            }
            placeholder="Enter supplier phone number"
            addonBefore={prefixSelector}
            style={{ width: "100%" }}
          />
          <Input
            placeholder="Enter supplier address"
            allowClear
            value={supplierData.address}
            onChange={(e) =>
              setSupplierData({ ...supplierData, address: e.target.value })
            }
          />
        </Flex>
      </Modal>
    </>
  );
};

const prefixSelector = (
  <Form.Item name="prefix" noStyle>
    <Select style={{ width: 70 }}>
      <Option value="95">+95</Option>
      <Option value="87">+87</Option>
    </Select>
  </Form.Item>
);
