import { Button, Flex, Input, Modal, Select, message } from "antd";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import { Customer } from "../../../types";
import { useCreateCustomer } from "../../../hooks/customers/useCustomers";
import { useAuth } from "../../../context/AuthContext";
const { Option } = Select;

interface Props {
  setSelectedRowKeys: (value: any) => void;
  setSelectedCustomer: (value: any) => void;
}

export const AddCustomer = ({
  setSelectedRowKeys,
  setSelectedCustomer,
}: Props) => {
  const { token } = useAuth();
  const [messageApi, contextHolder] = message.useMessage();
  const {
    mutate: createNewCustomer,
    data: createdCustomer,
    isLoading,
    isSuccess,
  } = useCreateCustomer();

  const [customerData, setCustomerData] = useState<Customer>({
    name: "",
    contact_number: "",
    email: "",
    loyalty_points: 10,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "Please fill all input!",
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    const { name, contact_number, email } = customerData;
    const isValid = name && contact_number && email && token;
    if (!isValid) return warning();
    const data = customerData;
    createNewCustomer({
      data,
      accessToken: token,
    });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!isLoading && isSuccess && createdCustomer) {
      setSelectedRowKeys([createdCustomer.id]);
      setSelectedCustomer(createdCustomer);
    }
  }, [isLoading, isSuccess]);
  return (
    <>
      {contextHolder}
      <Button
        style={{
          display: "flex",

          alignItems: "center",
        }}
        type="primary"
        onClick={showModal}
      >
        Add
      </Button>
      <Modal
        width={"100%"}
        style={{ maxWidth: 600 }}
        closable={false}
        centered
        title={<Title level={4}>Add customer</Title>}
        open={isModalOpen}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleAdd}>
            Add
          </Button>,
        ]}
      >
        <Flex vertical gap={12}>
          <Input
            placeholder="Enter name"
            allowClear
            value={customerData.name}
            onChange={(e) =>
              setCustomerData({ ...customerData, name: e.target.value })
            }
          />

          <Input
            onChange={(e) =>
              setCustomerData({
                ...customerData,
                contact_number: e.target.value,
              })
            }
            placeholder="Enter phone number"
            addonBefore={prefixSelector}
            style={{ width: "100%" }}
          />

          <Input
            placeholder="Enter email"
            allowClear
            value={customerData.email}
            onChange={(e) =>
              setCustomerData({ ...customerData, email: e.target.value })
            }
          />
        </Flex>
      </Modal>
    </>
  );
};

const prefixSelector = (
  <Select style={{ width: 70 }}>
    <Option value="95">+95</Option>
    <Option value="87">+87</Option>
  </Select>
);
