import {
    Button,
    DatePicker,
    DatePickerProps,
    Flex,
    Input,
    InputNumber,
    Select,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { useProduct, useUpdateProduct } from "../../hooks/products/useProducts";
import dayjs from "dayjs";
import { Category, Product, Supplier } from "../../types";
import { useCategories } from "../../hooks/categories/useCategories";
import { useSuppliers } from "../../hooks/suppliers/useSuppliers";
import { Upload, UploadFile, UploadProps } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { CreateCategoryModal } from "./CreateCategoryModal";
import { CreateSupplierModal } from "./CreateSupplierModal";
import toast from "react-hot-toast";
export const EditProduct = () => {
    const navigate = useNavigate();
    const { productId } = useParams();
    const { token } = useAuth();
    const {
        mutate: updateProduct,
        isLoading,
        isSuccess,
        isError,
    } = useUpdateProduct();
    const { data: currentProduct } = useProduct(Number(productId), token || "");
    const { data: categories } = useCategories(token || "");
    const { data: suppliers } = useSuppliers(token || "");

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

    const handleUpdate = async () => {
        console.log(productData);
        const {
            name,
            description,
            quantity,
            expriy_date,
            supplier_id,
            category_id,
        } = productData;

        const isValid =
            productId &&
            name &&
            description &&
            quantity &&
            expriy_date &&
            supplier_id &&
            category_id &&
            token;

        if (!isValid) return toast.error("Please fill all input!");

        const formData = new FormData();
        Object.entries(productData).forEach(([key, value]) => {
            if (key === "expriy_date") {
                formData.append(key, value.toISOString());
            } else {
                formData.append(key, value);
            }
        });
        const id = Number(productId);
        if (file) {
            formData.append("file", file as unknown as Blob);

            for (let [key, value] of formData.entries()) {
                console.log(key, value);
            }

            updateProduct({ id, data: formData, accessToken: token });
        } else {
            updateProduct({ id, data: formData, accessToken: token });
        }
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
        }
    }, [currentProduct]);

    useEffect(() => {
        if (!isLoading) {
            if (isSuccess) {
                navigate(-1);
                toast.success("Product updated successfully!");
            } else if (isError) {
                // Handle error state, e.g., display a message
                toast.error("Operation failed!");
            }
        }
    }, [isLoading, isSuccess, isError, navigate]);

    return (
        <>
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
                            value={productData.category_id}
                            onChange={(value) =>
                                setProductData({
                                    ...productData,
                                    category_id: value,
                                })
                            }
                            options={categories?.map((item: Category) => {
                                return { label: item.name, value: item.id };
                            })}
                        />

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
                            value={productData.supplier_id}
                            placeholder="select supplier"
                            onChange={(value) =>
                                setProductData({
                                    ...productData,
                                    supplier_id: value,
                                })
                            }
                            options={suppliers?.map((item: Supplier) => {
                                return { label: item.name, value: item.id };
                            })}
                        />

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
                        onClick={handleUpdate}
                    >
                        Update
                    </Button>
                </div>
            </Flex>
        </>
    );
};
