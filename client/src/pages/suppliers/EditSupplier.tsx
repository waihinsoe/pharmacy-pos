import { Button, Flex, Form, Input, Select, message } from "antd";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";

import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import {
  useSupplier,
  useUpdateSupplier,
} from "../../hooks/suppliers/useSuppliers";
import { Supplier } from "../../types";

const { Option } = Select;
// name description

export const EditSupplier = () => {
  const navigate = useNavigate();
  const { supplierId } = useParams();
  const { token } = useAuth();
  const { mutate: updateSupplier, isLoading, isSuccess } = useUpdateSupplier();
  const { data: currentSupplier } = useSupplier(
    Number(supplierId),
    token || ""
  );
  const [supplierData, setSupplierData] = useState<Supplier>({
    name: "",
    contact_number: "",
    address: "",
  });
  const [messageApi, contextHolder] = message.useMessage();

  const handleUpdate = () => {
    const { name, contact_number, address } = supplierData;
    const isValid = supplierId && name && contact_number && address && token;
    if (!isValid) return warning();
    const id = Number(supplierId);
    const data = supplierData;
    updateSupplier({ id, data, accessToken: token });
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
    if (currentSupplier) {
      setSupplierData(currentSupplier);
    }
  }, [currentSupplier]);

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
        <Title level={3}>Edit Supplier</Title>

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
            placeholder="Enter supplier name"
            allowClear
            value={supplierData.name}
            onChange={(e) =>
              setSupplierData({ ...supplierData, name: e.target.value })
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
            value={supplierData.contact_number}
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
        </div>

        <div
          style={{
            width: "100%",
            maxWidth: 800,
            display: "grid",
            gridTemplateColumns: "1fr 3fr",
          }}
        >
          <Title level={5}>Address</Title>
          <Input
            placeholder="Enter supplier address"
            allowClear
            value={supplierData.address}
            onChange={(e) =>
              setSupplierData({ ...supplierData, address: e.target.value })
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
