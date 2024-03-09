import { Dayjs } from "dayjs";

export interface Product {
  id?: number;
  category_id?: number;
  supplier_id?: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  expriy_date: Dayjs;
  img_url: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface SaledProduct extends Product {
  count: number;
}
