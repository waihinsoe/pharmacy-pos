import { Flex, Select } from "antd";
import { PosTopBar } from "../../../components/navbar/PosTopBar";
import { useCategories } from "../../../hooks/categories/useCategories";
import { useAuth } from "../../../context/AuthContext";
import { Category } from "../../../types";
import { useState } from "react";
import { ShowProducts } from "./ShowProducts";
import { SelectedProductList } from "./SelectedProductList";
import { CheckoutSection } from "./CheckoutSection";
import { CustomerSelect } from "./CustomerSelect";

export const NewSale = () => {
  const { token } = useAuth();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | string>(
    "All"
  );
  const [selectedCustomer, setSelectedCustomer] = useState();
  const [productSearchTerm, setProductSearchTerm] = useState("");

  const { data: categories } = useCategories(token || "");

  const optionData: Category[] = categories?.map((item: Category) => {
    return { label: item.name, value: item.id };
  });

  const handleChange = (value: number | string) => {
    setSelectedCategoryId(value);
    console.log(`selected ${value}`);
  };
  return (
    <Flex vertical style={{ height: "100vh" }}>
      <PosTopBar
        productSearchTerm={productSearchTerm}
        setProductSearchTerm={setProductSearchTerm}
      />
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
            defaultValue={"All"}
            placeholder={"select category"}
            onChange={handleChange}
            options={
              optionData && [{ label: "All", value: "All" }, ...optionData]
            }
          />

          <ShowProducts
            productSearchTerm={productSearchTerm}
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
            <CustomerSelect
              selectedCustomer={selectedCustomer}
              setSelectedCustomer={setSelectedCustomer}
            />
          </Flex>

          <SelectedProductList
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
          />

          <CheckoutSection
            selectedProducts={selectedProducts}
            selectedCustomer={selectedCustomer}
            setSelectedProducts={setSelectedProducts}
          />
        </Flex>
        {/* Checkout */}
      </Flex>
    </Flex>
  );
};
