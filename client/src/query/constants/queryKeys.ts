export const queryKeys = {
  products: "products",
  product: (id: number) => [`products`, id],

  categories: "categories",
  category: (id: number) => [`categories`, id],

  suppliers: "suppliers",
  supplier: (id: number) => [`suppliers`, id],

  customers: "customers",
  customer: (id: number) => [`customers`, id],

  sales: "sales",
  sale: (id: number) => [`sales`, id],
  saleDetail: (saleId: number) => [`sales`, saleId, "detail"],

  dailySalesReport: (query: any) => [`salesReport`, "daily", query],
  monthlySalesReport: (query: any) => [`salesReport`, "monthly", query],
  yearlySalesReport: (query: any) => [`salesReport`, "yearly", query],
};
