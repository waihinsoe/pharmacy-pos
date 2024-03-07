import { Button, Col, Flex, Row, Select } from "antd";
import { PosTopBar } from "../../components/navbar/PosTopBar";
import { useCategories } from "../../hooks/categories/useCategories";
import { useAuth } from "../../context/AuthContext";
import { Category, Product } from "../../types";
import { useState } from "react";
import { ShowProducts } from "./ShowProducts";
import { FaPlus } from "react-icons/fa";
import { SelectedProductList } from "./SelectedProductList";
import { calculateTotalAmount, calculateTotalItems } from "../../utils";
import { CheckoutSection } from "./CheckOutSection";

export interface SelectedProduct extends Product {
  count: number;
}
export const NewSale = () => {
  const { token } = useAuth();

  const [selectedProducts, setSelectedProducts] = useState([]);
  console.log(selectedProducts);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const { data: categories } = useCategories(token || "");

  const optionData: Category[] = categories?.map((item: Category) => {
    return { label: item.name, value: item.id };
  });
  const handleChange = (value: number | null) => {
    setSelectedCategoryId(value);
    console.log(`selected ${value}`);
  };
  return (
    <Flex vertical style={{ height: "100vh" }}>
      <PosTopBar />
      <Flex style={{ flex: 1, backgroundColor: "pink", height: "90%" }}>
        {/* ShowProducts */}
        <Flex
          flex={3}
          vertical
          style={{
            padding: "15px",
            backgroundColor: "#dfdfdf",
          }}
          gap={16}
        >
          <Select
            defaultValue={null}
            placeholder={"select category"}
            onChange={handleChange}
            options={
              optionData && [{ label: "All", value: null }, ...optionData]
            }
          />

          <ShowProducts
            categoryId={selectedCategoryId}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
          />
        </Flex>
        {/* ShowProducts */}

        {/* Checkout */}
        <Flex
          vertical
          gap={16}
          flex={2}
          style={{
            padding: "15px",
            flex: 2,
            backgroundColor: "#f8f8f8",
          }}
        >
          <Flex>
            <Button
              style={{
                display: "flex",
                alignItems: "center",
              }}
              type="primary"
              icon={<FaPlus />}
            >
              Add customer
            </Button>
          </Flex>
          <SelectedProductList
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
          />
          <CheckoutSection selectedProducts={selectedProducts} />
        </Flex>
        {/* Checkout */}
      </Flex>
    </Flex>
  );
};
