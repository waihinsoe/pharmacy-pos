import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCreateProduct } from "../../hooks/products/useProducts";
import {
  Button,
  DatePicker,
  DatePickerProps,
  Divider,
  Flex,
  InputNumber,
  Select,
  message,
} from "antd";
import { Category, Product } from "../../types";
import Title from "antd/es/typography/Title";
import Input, { InputRef } from "antd/es/input/Input";
import TextArea from "antd/es/input/TextArea";
import { FaPlus } from "react-icons/fa6";
import { useCategories } from "../../hooks/categories/useCategories";
import dayjs from "dayjs";
import { useSuppliers } from "../../hooks/suppliers/useSuppliers";

export const CreateProduct = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { mutate: createNewProduct, isLoading } = useCreateProduct();
  const [selectedSupplierId, setSelectedSupplierId] = useState<
    number | undefined
  >();
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    number | undefined
  >();
  const [productData, setProductData] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    expriy_date: dayjs(),
    img_url: "",
  });
  const [messageApi, contextHolder] = message.useMessage();
  const [name, setName] = useState("");
  const inputRef = useRef<InputRef>(null);

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    setProductData({ ...productData, expriy_date: date });
  };

  const { data: categories } = useCategories(token || "");
  const { data: suppliers } = useSuppliers(token || "");
  const handleCreate = () => {
    const { name, description, quantity, expriy_date } = productData;

    const isValid =
      name &&
      description &&
      quantity &&
      expriy_date &&
      selectedSupplierId &&
      selectedCategoryId;

    if (!isValid) return warning();

    const data: Product = {
      ...productData,
      category_id: selectedCategoryId,
      supplier_id: selectedSupplierId,
    };

    createNewProduct({
      data,
      accessToken: token || "",
    });
    // route back
    navigate(-1);
  };

  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "Please fill all input!",
    });
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <>
      {contextHolder}
      <Flex vertical gap={16} align="start">
        <Title level={3}>Create New Product</Title>
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
            placeholder="Enter product name"
            allowClear
            value={productData.name}
            onChange={(e) =>
              setProductData({ ...productData, name: e.target.value })
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
          <Title level={5}>Select category</Title>
          <Select
            placeholder="Select cateogry"
            onChange={(value) => setSelectedCategoryId(value)}
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider style={{ margin: "8px 0" }} />
                <Flex gap={4}>
                  <Input
                    style={{ flex: 1 }}
                    placeholder="Please enter new category name"
                    ref={inputRef}
                    value={name}
                    onChange={onNameChange}
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                  <Button
                    type="primary"
                    icon={<FaPlus />}
                    onClick={addItem}
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    create category
                  </Button>
                </Flex>
              </>
            )}
            options={categories?.map((item: Category) => ({
              label: item.name,
              value: item.id,
            }))}
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
          <Title level={5}>Price</Title>
          <InputNumber
            style={{ width: "100%" }}
            value={productData.price}
            onChange={(value) =>
              setProductData({ ...productData, price: value || 0 })
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
          <Title level={5}>Quantity</Title>
          <InputNumber
            style={{ width: "100%" }}
            max={1000}
            value={productData.quantity}
            onChange={(value) =>
              setProductData({ ...productData, quantity: value || 0 })
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
          <Title level={5}>Select supplier</Title>
          <Select
            placeholder="Select supplier"
            onChange={(value) => setSelectedSupplierId(value)}
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider style={{ margin: "8px 0" }} />
                <Flex gap={4}>
                  <Input
                    style={{ flex: 1 }}
                    placeholder="Please enter new supplier name"
                    ref={inputRef}
                    value={name}
                    onChange={onNameChange}
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                  <Button
                    type="primary"
                    icon={<FaPlus />}
                    onClick={addItem}
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    create supplier
                  </Button>
                </Flex>
              </>
            )}
            options={suppliers?.map((item: Category) => ({
              label: item.name,
              value: item.id,
            }))}
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
          <Title level={5}>Expriy date</Title>
          <DatePicker value={productData.expriy_date} onChange={onChange} />
        </div>

        <div
          style={{
            width: "100%",
            maxWidth: 800,
            display: "grid",
            gridTemplateColumns: "1fr 3fr",
          }}
        >
          <Title level={5}>Description</Title>
          <TextArea
            placeholder="Enter description...."
            allowClear
            value={productData.description}
            onChange={(e) =>
              setProductData({ ...productData, description: e.target.value })
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
