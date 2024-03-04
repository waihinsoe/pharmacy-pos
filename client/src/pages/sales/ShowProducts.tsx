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
  console.log(productsByCategoryId);
  if (isLoading) return <div>loading ....</div>;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill,minmax(120px,1fr))",
        gap: 16,
      }}
    >
      {productsByCategoryId.map((product) => {
        const isSelectedProduct = selectedProducts.some(
          (item) => item.id === product.id
        );
        return (
          <div
            onClick={() => {
              if (isSelectedProduct) {
                const filteredProducts = selectedProducts.filter(
                  (item) => item.id !== product.id
                );
                return setSelectedProducts(filteredProducts);
              }
              setSelectedProducts([...selectedProducts, product]);
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