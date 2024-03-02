import  {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCreateProduct } from "../../hooks/products/useProducts";
import {
  Button,
  DatePicker,
  DatePickerProps,
  Flex,
  InputNumber,
  Select,
  message,
} from "antd";
import { Category, Product, Supplier } from "../../types";
import Title from "antd/es/typography/Title";
import Input from "antd/es/input/Input";
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

  const onChange: DatePickerProps["onChange"] = (date) => {
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
          <div style={{ width: "100%", display: "flex", gap: 4 }}>
            <Select
              style={{ flex: 1 }}
              placeholder="select category"
              onChange={(value) => setSelectedCategoryId(value)}
              options={categories?.map((item: Category) => {
                return { label: item.name, value: item.id };
              })}
            />
            <Button
              type="primary"
              icon={<FaPlus />}
              onClick={() => navigate("/categories/create")}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              create category
            </Button>
          </div>
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
          <div style={{ width: "100%", display: "flex", gap: 4 }}>
            <Select
              style={{ flex: 1 }}
              placeholder="select supplier"
              onChange={(value) => setSelectedSupplierId(value)}
              options={suppliers?.map((item: Supplier) => {
                return { label: item.name, value: item.id };
              })}
            />
            <Button
              onClick={() => navigate("/suppliers/create")}
              type="primary"
              icon={<FaPlus />}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              create supplier
            </Button>
          </div>
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
