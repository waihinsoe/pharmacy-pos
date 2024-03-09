import { Payment } from ".";
import { SelectedProduct } from "./productTypes";

export interface CreateSaleDataType {
  customer_id: number | undefined;
  user_id: number;
  saled_products: SelectedProduct[];
  payment_method: Payment;
}

export interface CreateSaleMutationDataType {
  data: CreateSaleDataType;
  accessToken: string;
}

export interface ReceiptDataType {
  sale_id: number;
  selectedProducts: SelectedProduct[];
}
