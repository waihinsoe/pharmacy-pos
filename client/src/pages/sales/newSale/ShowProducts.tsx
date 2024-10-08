import { useProducts } from "../../../hooks/products/useProducts";
import { useAuth } from "../../../context/AuthContext";
import { Product } from "../../../types";
import { ProductCard } from "./ProductCard";
import Badge from "antd/es/badge";
import { SelectedProduct } from "../../../types/productTypes";
import BarcodeScannerInput from "../../../components/scanner/BarcodeScannerInput";
import toast from "react-hot-toast";
interface Props {
  productSearchTerm: string;
  categoryId: number | string;
  selectedProducts: SelectedProduct[];
  setSelectedProducts: (value: any) => void;
}

export const ShowProducts = ({
  categoryId,
  selectedProducts,
  setSelectedProducts,
  productSearchTerm,
}: Props) => {
  const { token } = useAuth();
  const { data: products, isLoading } = useProducts(token || "");

  const searchedProducts = productSearchTerm
    ? products?.filter((product: Product) =>
        product.name.toLowerCase().includes(productSearchTerm.toLowerCase())
      )
    : [];

  const productsByCategoryId: Product[] =
    categoryId === "All"
      ? products
      : products?.filter((item: Product) => item.category_id === categoryId);

  const onScan = (value: string) => {
    if (value) {
      const scannedProduct = products?.find(
        (product: Product) => product.barcode === value
      );

      if (!scannedProduct) {
        return toast.error("Product not found or scan error, TryAgain!");
      }
      if (scannedProduct.quantity === 0) return toast.error("out of stock!");

      const selectedProduct = selectedProducts.find(
        (item) => item.id === scannedProduct.id
      );

      if (selectedProduct) {
        if (selectedProduct.count == selectedProduct.quantity)
          return toast.error("out of stock!");
        const filteredProducts = selectedProducts.filter(
          (item) => item.id !== selectedProduct.id
        );
        setSelectedProducts([
          ...filteredProducts,
          { ...selectedProduct, count: selectedProduct.count + 1 },
        ]);
      } else {
        setSelectedProducts([
          ...selectedProducts,
          { ...scannedProduct, count: 1 },
        ]);
      }
      toast.success("Product scanned successfully!");
    }
  };

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
      <BarcodeScannerInput onScan={onScan} />

      {searchedProducts.length
        ? searchedProducts.map((product: Product) => {
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
          })
        : productsByCategoryId.map((product) => {
            const isSelectedProduct = selectedProducts.some(
              (item) => item.id === product.id
            );
            return (
              <div
                key={product.id}
                onClick={() => {
                  if (!isSelectedProduct && product.quantity) {
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

      {/* {productsByCategoryId.map((product) => {
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
      })} */}
    </div>
  );
};
