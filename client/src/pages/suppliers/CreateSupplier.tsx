import { Button, Flex, Form, Input, Select, message } from "antd";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useCreateSupplier } from "../../hooks/suppliers/useSuppliers";
import { Supplier } from "../../types";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import toast from "react-hot-toast";

export const CreateSupplier = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const {
    mutate: createNewSupplier,
    isLoading,
    isSuccess,
    isError,
  } = useCreateSupplier();
  const [supplierData, setSupplierData] = useState<Supplier>({
    name: "",
    contact_number: "",
    address: "",
  });

  console.log(supplierData.contact_number);

  const handleCreate = () => {
    const { name, contact_number, address } = supplierData;
    const isValid = name && contact_number && address && token;
    if (!isValid) return toast.error("Please fill all input!");
    const data = supplierData;
    createNewSupplier({
      data,
      accessToken: token,
    });
  };

  useEffect(() => {
    if (!isLoading) {
      if (isSuccess) {
        navigate(-1);
        toast.success("Supplier created successfully!");
      } else if (isError) {
        // Handle error state, e.g., display a message
        toast.error("Operation failed!");
      }
    }
  }, [isLoading, isSuccess, isError, navigate]);
  return (
    <>
      <Flex vertical gap={16} align="start">
        <Title level={3}>Create Supplier</Title>

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

          <PhoneInput
            enableSearch={true}
            inputStyle={{ width: "100%", borderRadius: 3 }}
            searchStyle={{ width: "100%", margin: 0 }}
            disableSearchIcon
            country={"us"}
            value={supplierData.contact_number}
            onChange={(value) =>
              setSupplierData({
                ...supplierData,
                contact_number: value,
              })
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
            onClick={handleCreate}
          >
            Create
          </Button>
        </div>
      </Flex>
    </>
  );
};
