import {
  Badge,
  Button,
  Collapse,
  Flex,
  Select,
  Tag,
  Typography,
  theme,
} from "antd";
import { PosTopBar } from "../../components/navbar/PosTopBar";
import { useCategories } from "../../hooks/categories/useCategories";
import { useAuth } from "../../context/AuthContext";
import { Category } from "../../types";
import { useState } from "react";
import { ShowProducts } from "./ShowProducts";
import { FaPlus } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";

const { useToken } = theme;
export const NewSale = () => {
  const { token } = useAuth();
  const { token: themeToken } = useToken();
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
          <Flex vertical gap={4} flex={1} style={{ overflowY: "scroll" }}>
            {selectedProducts.map((item: any) => {
              return (
                <Collapse
                  size="small"
                  items={[
                    {
                      key: "1",
                      label: (
                        <Flex justify="space-between" align="center">
                          <Flex gap={16} align="center">
                            <Badge
                              count={item.count}
                              style={{
                                backgroundColor: themeToken.colorPrimary,
                              }}
                            />

                            <Typography style={{ fontWeight: "500" }}>
                              {item.name}
                            </Typography>
                          </Flex>
                          <Tag
                            color="green"
                            icon={<GiMoneyStack size={16} />}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 8,
                            }}
                          >
                            {item.price}
                          </Tag>
                        </Flex>
                      ),
                      children: <p>{item.name}</p>,
                    },
                  ]}
                />
              );
            })}
            {!selectedProducts.length && <div>not items</div>}
          </Flex>
          <Flex>
            <Button
              style={{
                width: "100%",
              }}
              type="primary"
            >
              Checkout
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
