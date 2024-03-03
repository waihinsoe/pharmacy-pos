import { Flex, Segmented } from "antd";
import { PosTopBar } from "../../components/navbar/PosTopBar";
import { useCategories } from "../../hooks/categories/useCategories";
import { useAuth } from "../../context/AuthContext";
import { Category } from "../../types";

export const NewSale = () => {
  const { token } = useAuth();
  const { data: categories, isLoading } = useCategories(token || "");
  return (
    <Flex vertical style={{ height: "100vh" }}>
      <PosTopBar />
      <Flex style={{ flex: 1, backgroundColor: "pink" }}>
        <Flex
          flex={3}
          vertical
          style={{ padding: "10px 15px", backgroundColor: "#dfdfdf" }}
        >
          <Segmented
            options={categories?.map((item: Category) => {
              return { label: item.name, value: item.id };
            })}
            onChange={(value) => {
              console.log(value); // string
            }}
            style={{ width: "fit-content" }}
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
