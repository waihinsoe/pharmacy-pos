import { Dayjs } from "dayjs";

export interface User {
  id: number;
  name: string;
  password: string;
  contact_number: string;
  email: string;
  role: Role;
  hire_date: Date;
  created_at?: Date;
  updated_at?: Date;
}

export interface Category {
  id?: number;
  name: string;
  description: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Product {
  id?: number;
  category_id?: number;
  supplier_id?: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  barcode: string;
  expriy_date: Dayjs;
  img_url?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Supplier {
  id?: number;
  name: string;
  contact_number: string;
  address: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface Customer {
  id?: number;
  name: string;
  contact_number: string;
  email: string;
  loyalty_points: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface PaginationAndSearchQuery {
  page: number;
  limit: number;
  searchTerm: string;
}

export interface ReportDateQuery {
  startDate: string;
  endDate: string;
}

enum Role {
  CASHIER = "CASHIER",
  ADMIN = "ADMIN",
}

export enum Payment {
  CASH = "CASH",
  KPAY = "KPAY",
}
