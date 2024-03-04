import { Flex, Segmented, Select } from "antd";
import { PosTopBar } from "../../components/navbar/PosTopBar";
import { useCategories } from "../../hooks/categories/useCategories";
import { useAuth } from "../../context/AuthContext";
import { Category } from "../../types";
import { useState } from "react";
import { ShowProducts } from "./ShowProducts";

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
      <Flex style={{ flex: 1, backgroundColor: "pink" }}>
        <Flex
          flex={3}
          vertical
          style={{ padding: "15px", backgroundColor: "#dfdfdf" }}
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
        <Flex
          flex={2}
          style={{ padding: "10px 15px", flex: 2, backgroundColor: "#f8f8f8" }}
        >
          order section
        </Flex>
      </Flex>
    </Flex>
  );
};
