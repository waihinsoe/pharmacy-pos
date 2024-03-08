import { Flex, Typography } from "antd";
import { Product } from "../../../types";

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
        <Typography>{product.name}</Typography>
        <Typography>{product.quantity}</Typography>
        <Typography>{product.price}</Typography>
      </Flex>
    </div>
  );
};
