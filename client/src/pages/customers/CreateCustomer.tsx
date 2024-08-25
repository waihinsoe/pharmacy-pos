import { Button, Flex, Form, Input, InputNumber, Select } from "antd";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Customer } from "../../types";
import { useCreateCustomer } from "../../hooks/customers/useCustomers";
import toast from "react-hot-toast";
const { Option } = Select;
// name description

export const CreateCustomer = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const {
    mutate: createNewCustomer,
    isLoading,
    isSuccess,
    isError,
  } = useCreateCustomer();
  const [customerData, setCustomerData] = useState<Customer>({
    name: "",
    contact_number: "",
    email: "",
    loyalty_points: 0,
  });

  const handleCreate = () => {
    const { name, contact_number, email } = customerData;
    const isValid = name && contact_number && email && token;
    if (!isValid) return toast.error("Please fill all input!");
    const data = customerData;
    createNewCustomer({
      data,
      accessToken: token,
    });
  };

  useEffect(() => {
    if (!isLoading) {
      if (isSuccess) {
        navigate(-1);
        toast.success("Customer created successfully!");
      } else if (isError) {
        // Handle error state, e.g., display a message
        toast.error("Operation failed!");
      }
    }
  }, [isLoading, isSuccess, isError, navigate]);
  return (
    <>
      <Flex vertical gap={16} align="start">
        <Title level={3}>Create Customer</Title>

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
            onClick={handleCreate}
          >
            Create
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
