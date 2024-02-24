export const queryKeys = {
  products: "products",
  product: (id: number) => [`products`, id],

  categories: "categories",
  category: (id: number) => [`categories`, id],
};
