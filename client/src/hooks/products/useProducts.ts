import { useMutation, useQuery, useQueryClient } from "react-query";
import { queryKeys } from "../../query/constants/queryKeys";
import { productService } from "../../services/api/productService";
import { PaginationAndSearchQuery, Product } from "../../types";

export const useProducts = (
  query: PaginationAndSearchQuery,
  accessToken: string
) =>
  useQuery(
    [queryKeys.products, query],
    () => productService.list(query, accessToken),
    {
      keepPreviousData: true,
    }
  );

export const useProduct = (id: number, accessToken: string) =>
  useQuery([queryKeys.product(id)], () => productService.get(id, accessToken));

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ data, accessToken }: { data: Product; accessToken: string }) =>
      productService.create(data, accessToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.products);
      },
    }
  );
};
