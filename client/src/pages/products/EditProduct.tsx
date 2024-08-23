import {
  Button,
  DatePicker,
  DatePickerProps,
  Flex,
  Input,
  InputNumber,
  Select,
  message,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { useProduct, useUpdateProduct } from "../../hooks/products/useProducts";
import dayjs from "dayjs";
import { Category, Product, Supplier } from "../../types";
import { FaPlus } from "react-icons/fa6";
import { useCategories } from "../../hooks/categories/useCategories";
import { useSuppliers } from "../../hooks/suppliers/useSuppliers";
import { Upload, UploadFile, UploadProps } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ImageUpload } from "../../utils";
import { CreateCategoryModal } from "./CreateCategoryModal";
import { CreateSupplierModal } from "./CreateSupplierModal";
export const EditProduct = () => {
  const navigate = useNavigate();
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
    barcode: "",
  });
  const [file, setFile] = useState<UploadFile>();

  const [messageApi, contextHolder] = message.useMessage();

  const handleUpdate = async () => {
    const { name, description, quantity, expriy_date } = productData;

    console.log(expriy_date);

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
    if (file) {
      const url = await ImageUpload(file, token);
      const id = Number(productId);
      const data: Product = {
        ...productData,
        category_id: selectedCategoryId,
        supplier_id: selectedSupplierId,
        img_url: url as string,
      };
      updateProduct({ id, data, accessToken: token });
    } else {
      const id = Number(productId);
      const data: Product = {
        ...productData,
        category_id: selectedCategoryId,
        supplier_id: selectedSupplierId,
      };
      updateProduct({ id, data, accessToken: token });
    }
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

  const props: UploadProps = {
    onRemove: () => {
      setFile(undefined);
    },
    beforeUpload: (file) => {
      setFile(file);
      return false;
    },
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
      success();
      navigate(-1);
    }
  }, [isLoading, isSuccess]);

  return (
    <>
      {contextHolder}
      <Flex vertical gap={16} align="start">
        <Title level={3}>Edit Product</Title>
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
              value={selectedCategoryId}
              onChange={(value) => setSelectedCategoryId(value)}
              options={categories?.map((item: Category) => {
                return { label: item.name, value: item.id };
              })}
            />
            {/* <Button
              type="primary"
              icon={<FaPlus />}
              onClick={() => navigate("/categories/create")}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              create category
            </Button> */}
            <CreateCategoryModal />
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
          <Title level={5}>BarCode</Title>
          <Input
            placeholder="Enter product barcode"
            allowClear
            value={productData.barcode}
            onChange={(e) =>
              setProductData({ ...productData, barcode: e.target.value })
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
              value={selectedSupplierId}
              placeholder="select supplier"
              onChange={(value) => setSelectedSupplierId(value)}
              options={suppliers?.map((item: Supplier) => {
                return { label: item.name, value: item.id };
              })}
            />
            {/* <Button
              onClick={() => navigate("/suppliers/create")}
              type="primary"
              icon={<FaPlus />}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              create supplier
            </Button> */}

            <CreateSupplierModal />
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
          <Title level={5}>Photo</Title>
          <Upload maxCount={1} {...props}>
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
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
