import { useProducts } from "../../../hooks/products/useProducts";
import { useAuth } from "../../../context/AuthContext";
import { Product } from "../../../types";
import { ProductCard } from "./ProductCard";
import Badge from "antd/es/badge";
import { useEffect } from "react";
import socket from "../../../socket/socket";
import { SelectedProduct } from "../../../types/productTypes";
import { message } from "antd";
import ProductSuccessAudio from "../../../assets/product.mp3";
import ProductErrorAudio from "../../../assets/errorProduct.mp3";
import ProductSuccessAudio2 from "../../../assets/successProduct2.mp3";
import ProductErrorAudio2 from "../../../assets/errorProduct2.mp3";
import ProductSuccessAudio3 from "../../../assets/successProduct3.mp3";
import ProductErrorAudio3 from "../../../assets/errorProduct3.mp3";
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
  const [messageApi, contextHolder] = message.useMessage();

  const searchedProducts = productSearchTerm
    ? products?.filter((product: Product) =>
        product.name.toLowerCase().includes(productSearchTerm.toLowerCase())
      )
    : [];

  const productsByCategoryId: Product[] =
    categoryId === "All"
      ? products
      : products?.filter((item: Product) => item.category_id === categoryId);

  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "Product not found or scan error, TryAgain!",
    });
  };
  const success = () => {
    messageApi.open({
      type: "success",
      content: "Product scanned successfully!",
    });
  };
  useEffect(() => {
    socket.on("scannedProduct", (data: any) => {
      if (data.hasOwnProperty("barcode")) {
        const scannedProduct = products?.find(
          (product: Product) => product.barcode === data.barcode
        );

        if (!scannedProduct) {
          const sound = new Audio(ProductErrorAudio3);
          sound.play();
          return warning();
        }

        const selectedProduct = selectedProducts.find(
          (item) => item.id === scannedProduct.id
        );

        if (selectedProduct) {
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
        const sound = new Audio(ProductSuccessAudio3);
        sound.play();
        success();
      }
    });
    const sound = new Audio("/path/to/your/sound/productSelected.mp3");
    sound.play();
    return () => {
      socket.off("scannedProduct");
    };
  });
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
      {contextHolder}

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
