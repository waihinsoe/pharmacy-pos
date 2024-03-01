import {
  Button,
  DatePicker,
  DatePickerProps,
  Divider,
  Flex,
  Input,
  InputNumber,
  InputRef,
  Select,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import Title from "antd/es/typography/Title";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import { useProduct, useUpdateProduct } from "../../hooks/products/useProducts";
import dayjs from "dayjs";
import { Category, Product } from "../../types";
import { FaPlus } from "react-icons/fa6";
import { useCategories } from "../../hooks/categories/useCategories";
import { useSuppliers } from "../../hooks/suppliers/useSuppliers";

export const EditProduct = () => {
  const { productId } = useParams();
  const { token } = useAuth();
  const { mutate: updateProduct, isLoading, isSuccess } = useUpdateProduct();
  const { data: currentProduct } = useProduct(Number(productId), token || "");
  const { data: categories } = useCategories(token || "");
  const { data: suppliers } = useSuppliers(token || "");

  const [selectedSupplierId, setSelectedSupplierId] = useState<number>();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>();
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

  const handleUpdate = () => {
    const { name, description, quantity, expriy_date } = productData;

    const isValid =
      productId &&
      name &&
      description &&
      quantity &&
      expriy_date &&
      selectedSupplierId &&
      selectedCategoryId &&
      token;

    if (!isValid) return warning();

    const id = Number(productId);
    const data: Product = {
      ...productData,
      category_id: selectedCategoryId,
      supplier_id: selectedSupplierId,
    };
    updateProduct({ id, data, accessToken: token });
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

  const onChange: DatePickerProps["onChange"] = (date) => {
    setProductData({ ...productData, expriy_date: date });
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

  useEffect(() => {
    if (currentProduct) {
      //change string date into dayjs date
      currentProduct.expriy_date = dayjs(currentProduct.expriy_date);

      setProductData(currentProduct);
      setSelectedCategoryId(currentProduct.category_id);
      setSelectedSupplierId(currentProduct.supplier_id);
    }
  }, [currentProduct]);

  useEffect(() => {
    if (!isLoading && isSuccess) {
      return success();
    }
  }, [isLoading, isSuccess]);

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
            onClick={handleUpdate}
          >
            Update
          </Button>
        </div>
      </Flex>
    </>
  );
};
