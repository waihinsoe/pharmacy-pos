import { useMutation, useQuery, useQueryClient } from "react-query";
import { queryKeys } from "../../query/constants/queryKeys";
import { productService } from "../../services/api/productService";

export const useProducts = () =>
  useQuery(queryKeys.products, productService.list);

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(productService.create, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.products);
    },
  });
};
