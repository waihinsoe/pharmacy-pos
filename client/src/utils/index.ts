import { SelectedProduct } from "../pages/sales/newSale/NewSale";

export const calculateTotalItems = (selectedProducts: SelectedProduct[]) => {
  return selectedProducts.reduce(
    (accumulator, currentProduct: SelectedProduct) => {
      return accumulator + currentProduct.count;
    },
    0
  );
};

export const calculateTotalAmount = (selectedProducts: SelectedProduct[]) => {
  return selectedProducts.reduce(
    (accumulator, currentProduct: SelectedProduct) => {
      return accumulator + currentProduct.price * currentProduct.count;
    },
    0
  );
};
