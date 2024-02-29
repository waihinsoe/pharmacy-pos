import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCreateProduct } from "../../hooks/products/useProducts";
import { Button, Divider, Flex, Select, Space, message } from "antd";
import { Category, Product, Suppliers } from "../../types";
import Title from "antd/es/typography/Title";
import Input, { InputRef } from "antd/es/input/Input";
import TextArea from "antd/es/input/TextArea";
import { FaPlus } from "react-icons/fa6";
import { useCategories } from "../../hooks/categories/useCategories";

// id?: number;
// category_id: number;
// supplier_id: number;
// name: string;
// description: string;
// price: number;
// quantity: number;
// expriy_date: Date;
// img_url: string;
// created_at?: Date;
// updated_at?: Date;
let index = 0;
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
    expriy_date: new Date(),
    img_url: "",
  });
  const [messageApi, contextHolder] = message.useMessage();
  const [name, setName] = useState("");
  const inputRef = useRef<InputRef>(null);

  const { data: categories } = useCategories(token || "");
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

    console.log(data);

    // createNewProduct({
    //   data,
    //   accessToken: token || "",
    // });
    // // route back
    // navigate(-1);
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
        <div style={{ width: "100%" }}>
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

        <div style={{ width: "100%" }}>
          <Title level={5}>Select category</Title>
          <Select
            style={{ width: "100%" }}
            placeholder="custom dropdown render"
            onChange={(value) => setSelectedSupplierId(value)}
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider style={{ margin: "8px 0" }} />
                <Flex gap={4}>
                  <Input
                    style={{ flex: 1 }}
                    placeholder="Please enter item"
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

        <div style={{ width: "100%" }}>
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

        <Button loading={isLoading} type="primary" onClick={handleCreate}>
          Create
        </Button>
      </Flex>
    </>
  );
};
