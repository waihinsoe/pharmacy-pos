import { Button, Flex, Form, Input, InputNumber, Select, message } from "antd";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import {
  useSupplier,
  useUpdateSupplier,
} from "../../hooks/suppliers/useSuppliers";
import { Customer, Supplier } from "../../types";
import {
  useCustomer,
  useUpdateCustomer,
} from "../../hooks/customers/useCustomers";

const { Option } = Select;
// name description

export const EditCustomer = () => {
  const navigate = useNavigate();
  const { customerId } = useParams();
  const { token } = useAuth();
  const { mutate: updateCustomer, isLoading, isSuccess } = useUpdateCustomer();
  const { data: currentCustomer } = useCustomer(
    Number(customerId),
    token || ""
  );
  const [customerData, setCustomerData] = useState<Customer>({
    name: "",
    contact_number: "",
    email: "",
    loyalty_points: 0,
  });
  const [messageApi, contextHolder] = message.useMessage();

  const handleUpdate = () => {
    const { name, contact_number, email } = customerData;
    const isValid = customerId && name && contact_number && email && token;
    if (!isValid) return warning();
    const id = Number(customerId);
    const data = customerData;
    updateCustomer({ id, data, accessToken: token });
  };

  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "Please fill all input!",
    });
  };
  const success = () => {
    messageApi.open({
      type: "success",
      content: "updated successfully!",
    });
  };

  useEffect(() => {
    if (currentCustomer) {
      setCustomerData(currentCustomer);
    }
  }, [currentCustomer]);

  useEffect(() => {
    if (!isLoading && isSuccess) {
      success();
      navigate(-1);
    }
  }, [isLoading, isSuccess]);
  return (
    <>
      {contextHolder}
      <Flex vertical gap={16} align="start">
        <Title level={3}>Edit Customer</Title>

        <div
          style={{
            width: "100%",
            maxWidth: 800,
            display: "grid",
            gridTemplateColumns: "1fr 3fr",
          }}
        >
          <Title level={5}>Name</Title>
          <Input
            placeholder="Enter customer name"
            allowClear
            value={customerData.name}
            onChange={(e) =>
              setCustomerData({ ...customerData, name: e.target.value })
            }
          />
        </div>

        <div
          style={{
            width: "100%",
            maxWidth: 800,
            display: "grid",
            gridTemplateColumns: "1fr 3fr",
          }}
        >
          <Title level={5}>Contact-number</Title>
          <Input
            value={customerData.contact_number}
            onChange={(e) =>
              setCustomerData({
                ...customerData,
                contact_number: e.target.value,
              })
            }
            placeholder="Enter customer phone number"
            addonBefore={prefixSelector}
            style={{ width: "100%" }}
          />
        </div>

        <div
          style={{
            width: "100%",
            maxWidth: 800,
            display: "grid",
            gridTemplateColumns: "1fr 3fr",
          }}
        >
          <Title level={5}>Email</Title>
          <Input
            placeholder="Enter customer email"
            allowClear
            value={customerData.email}
            onChange={(e) =>
              setCustomerData({ ...customerData, email: e.target.value })
            }
          />
        </div>

        <div
          style={{
            width: "100%",
            maxWidth: 800,
            display: "grid",
            gridTemplateColumns: "1fr 3fr",
          }}
        >
          <Title level={5}>Loyalty points</Title>
          <InputNumber
            style={{ width: "100%" }}
            value={customerData.loyalty_points}
            onChange={(value) =>
              setCustomerData({ ...customerData, loyalty_points: value || 0 })
            }
          />
        </div>

        <div
          style={{
            width: "100%",
            maxWidth: 800,
            display: "grid",
            gridTemplateColumns: "1fr 3fr",
          }}
        >
          <div></div>
          <Button
            loading={isLoading}
            type="primary"
            style={{ width: "fit-content" }}
            onClick={handleUpdate}
          >
            Update
          </Button>
        </div>
      </Flex>
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
