import {
  Collapse,
  Flex,
  theme,
  Tag,
  Tooltip,
  Typography,
  Badge,
  Button,
  InputNumber,
} from "antd";
import { Product } from "../../../types";
import { GiMoneyStack } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { SelectedProduct } from "../../../types/productTypes";
import NotFoundImage from "../../../assets/3371471.png";
const { useToken } = theme;

interface Props {
  selectedProducts: SelectedProduct[];
  setSelectedProducts: (value: any) => void;
}

export const SelectedProductList = ({
  selectedProducts,
  setSelectedProducts,
}: Props) => {
  const { token: themeToken } = useToken();

  const onChangeQuantity = (value: number | null, product: SelectedProduct) => {
    const newSelectedProducts = selectedProducts.map((item) => {
      if (item.id === product.id) {
        return { ...item, count: value };
      } else {
        return item;
      }
    });
    setSelectedProducts(newSelectedProducts);
  };
  return (
    <Flex vertical gap={8} flex={1} style={{ overflowY: "scroll" }}>
      {selectedProducts.map((item: any) => {
        return (
          <Collapse
            collapsible="icon"
            key={item.id}
            size="small"
            items={[
              {
                key: item.id,
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
                    <Flex>
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

                      <Tooltip title="Remove">
                        <Button
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation();
                            const filteredProudcts = selectedProducts.filter(
                              (product: Product) => product.id !== item.id
                            );
                            setSelectedProducts(filteredProudcts);
                          }}
                          style={{
                            display: "grid",
                            placeItems: "center",
                          }}
                          shape="circle"
                          icon={<RxCross1 />}
                        />
                      </Tooltip>
                    </Flex>
                  </Flex>
                ),
                children: (
                  <Flex justify="space-evenly" gap={8}>
                    <div style={{ width: 120 }}></div>
                    <Flex vertical gap={4} style={{ width: "100%" }}>
                      <Typography style={{ fontWeight: 600 }}>
                        Quantity
                      </Typography>

                      <InputNumber
                        style={{ width: "100%" }}
                        min={1}
                        max={item.quantity}
                        value={item.count}
                        onChange={(value) => onChangeQuantity(value, item)}
                      />
                    </Flex>
                    <Flex vertical gap={4} style={{ width: "100%" }}>
                      <Typography style={{ fontWeight: 600 }}>
                        Discount%
                      </Typography>
                      <InputNumber
                        style={{ width: "100%" }}
                        defaultValue={20}
                      />
                    </Flex>
                  </Flex>
                ),
              },
            ]}
          />
        );
      })}
      {!selectedProducts.length && (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "grid",
            placeItems: "center",
          }}
        >
          <img src={NotFoundImage} style={{ width: "300px" }} />
        </div>
      )}
    </Flex>
  );
};
