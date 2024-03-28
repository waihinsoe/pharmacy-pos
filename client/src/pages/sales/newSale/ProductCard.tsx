import { Flex, Typography } from "antd";
import { Product } from "../../../types";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { GiMoneyStack } from "react-icons/gi";
import Paragraph from "antd/es/typography/Paragraph";

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: 3,
        border: "1px solid #fff",
        overflow: "hidden",
        cursor: "pointer",
      }}
    >
      <img
        src={product.img_url}
        style={{ aspectRatio: "6/4", objectFit: "cover", width: "100%" }}
        alt=""
      />
      <Flex vertical gap={4} style={{ padding: 5 }}>
        <Paragraph ellipsis>{product.name}</Paragraph>
        <Flex
          align="center"
          gap={4}
          style={{
            color:
              product.quantity === 0
                ? "red"
                : product.quantity <= 10
                ? "orange"
                : "black",
          }}
        >
          <MdOutlineProductionQuantityLimits />
          <Typography
            style={{
              color:
                product.quantity === 0
                  ? "red"
                  : product.quantity <= 10
                  ? "orange"
                  : "black",
            }}
          >
            {product.quantity}
          </Typography>
        </Flex>
        <Flex align="center" gap={4}>
          <GiMoneyStack />
          <Typography>{product.price}</Typography>
        </Flex>
      </Flex>
    </div>
  );
};
