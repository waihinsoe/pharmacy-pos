import { SaledProduct } from "../types";

export const calculateTotalItems = (saledProducts: SaledProduct[]) => {
  return saledProducts.reduce((accumulator, currentProduct: SaledProduct) => {
    return accumulator + currentProduct.count;
  }, 0);
};

export const calculateTotalAmount = (saledProducts: SaledProduct[]) => {
  return saledProducts.reduce((accumulator, currentProduct: SaledProduct) => {
    return accumulator + currentProduct.price * currentProduct.count;
  }, 0);
};
