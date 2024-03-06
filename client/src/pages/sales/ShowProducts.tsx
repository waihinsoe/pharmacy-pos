import { useProducts } from "../../hooks/products/useProducts";
import { useAuth } from "../../context/AuthContext";
import { Product } from "../../types";
import { ProductCard } from "./ProductCard";
import Badge from "antd/es/badge";

interface Props {
  categoryId: number | null;
  selectedProducts: Product[];
  setSelectedProducts: (value: any) => void;
}

export const ShowProducts = ({
  categoryId,
  selectedProducts,
  setSelectedProducts,
}: Props) => {
  const { token } = useAuth();
  const { data: products, isLoading } = useProducts(token || "");

  const productsByCategoryId: Product[] = categoryId
    ? products?.filter((item: Product) => item.category_id === categoryId)
    : products;

  if (isLoading) return <div>loading ....</div>;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill,minmax(100px,1fr))",
        gap: 16,
        padding: "0 10px",
        maxHeight: "100%",
        overflowY: "scroll",
      }}
    >
      {productsByCategoryId.map((product) => {
        const isSelectedProduct = selectedProducts.some(
          (item) => item.id === product.id
        );
        return (
          <div
            key={product.id}
            onClick={() => {
              if (!isSelectedProduct) {
                setSelectedProducts([
                  ...selectedProducts,
                  { ...product, count: 1 },
                ]);
              }
            }}
          >
            {isSelectedProduct ? (
              <Badge.Ribbon text="Selected">
                <ProductCard product={product} />
              </Badge.Ribbon>
            ) : (
              <ProductCard product={product} />
            )}
          </div>
        );
      })}
    </div>
  );
};
