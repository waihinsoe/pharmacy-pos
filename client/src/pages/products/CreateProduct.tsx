import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCreateProduct } from "../../hooks/products/useProducts";
import { UploadOutlined } from "@ant-design/icons";
import {
    Button,
    DatePicker,
    DatePickerProps,
    Flex,
    InputNumber,
    Select,
} from "antd";
import { Category, Product, Supplier } from "../../types";
import Title from "antd/es/typography/Title";
import Input from "antd/es/input/Input";
import TextArea from "antd/es/input/TextArea";
import { useCategories } from "../../hooks/categories/useCategories";
import dayjs from "dayjs";
import { useSuppliers } from "../../hooks/suppliers/useSuppliers";
import { Upload, UploadFile, UploadProps } from "antd";
import { CreateCategoryModal } from "./CreateCategoryModal";
import { CreateSupplierModal } from "./CreateSupplierModal";
import socket from "../../socket/socket";
import toast from "react-hot-toast";

export const CreateProduct = () => {
    const navigate = useNavigate();
    const { token } = useAuth();
    const {
        mutate: createNewProduct,
        isLoading,
        isSuccess,
        isError,
    } = useCreateProduct();
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
        barcode: "",
    });
    const [file, setFile] = useState<UploadFile>();
    const onChange: DatePickerProps["onChange"] = (date) => {
        setProductData({ ...productData, expriy_date: date });
    };

    const { data: categories } = useCategories(token || "");
    const { data: suppliers } = useSuppliers(token || "");

    const handleCreate = async () => {
        const { name, description, quantity, expriy_date, barcode } =
            productData;

        const isValid =
            name &&
            description &&
            quantity &&
            expriy_date &&
            selectedSupplierId &&
            selectedCategoryId &&
            barcode &&
            file &&
            token;

        if (!isValid) return toast.error("Please fill all input");

        const formData = new FormData();

        Object.entries(productData).forEach(([key, value]) => {
            if (key === "expriy_date") {
                formData.append(key, value.toISOString());
            } else {
                formData.append(key, value);
            }
        });
        formData.append("category_id", String(selectedCategoryId));
        formData.append("supplier_id", String(selectedSupplierId));
        formData.append("file", file as unknown as Blob);

        createNewProduct({
            data: formData,
            accessToken: token || "",
        });
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
        if (!isLoading) {
            if (isSuccess) {
                socket.emit("add_product", { message: "add_product" });
                navigate(-1);
                toast.success("Product created successfully!");
            } else if (isError) {
                // Handle error state, e.g., display a message
                toast.error("Operation failed!");
            }
        }
    }, [isLoading, isSuccess, isError, navigate, socket]);

    return (
        <>
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
                            setProductData({
                                ...productData,
                                name: e.target.value,
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
                            setProductData({
                                ...productData,
                                price: value || 0,
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
                    <Title level={5}>Quantity</Title>
                    <InputNumber
                        style={{ width: "100%" }}
                        max={1000}
                        value={productData.quantity}
                        onChange={(value) =>
                            setProductData({
                                ...productData,
                                quantity: value || 0,
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
                    <Title level={5}>BarCode</Title>
                    <Input
                        placeholder="Enter product barcode"
                        allowClear
                        value={productData.barcode}
                        onChange={(e) =>
                            setProductData({
                                ...productData,
                                barcode: e.target.value,
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
                    <DatePicker
                        value={productData.expriy_date}
                        onChange={onChange}
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
                    <Title level={5}>Description</Title>
                    <TextArea
                        placeholder="Enter description...."
                        allowClear
                        value={productData.description}
                        onChange={(e) =>
                            setProductData({
                                ...productData,
                                description: e.target.value,
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
                        onClick={handleCreate}
                    >
                        Create
                    </Button>
                </div>
            </Flex>
        </>
    );
};
