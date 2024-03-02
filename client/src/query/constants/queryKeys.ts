export const queryKeys = {
  products: "products",
  product: (id: number) => [`products`, id],

  categories: "categories",
  category: (id: number) => [`categories`, id],

  suppliers: "suppliers",
  supplier: (id: number) => [`suppliers`, id],

  customers: "customers",
  customer: (id: number) => [`customers`, id],
};
