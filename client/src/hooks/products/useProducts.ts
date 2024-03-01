import { useMutation, useQuery, useQueryClient } from "react-query";
import { queryKeys } from "../../query/constants/queryKeys";
import { categoryService } from "../../services/api/categoryService";
import { PaginationAndSearchQuery, Product } from "../../types";
import { productService } from "../../services/api/productService";

export const useProducts = (
  accessToken: string,
  query?: PaginationAndSearchQuery
) => {
  if (query) {
    return useQuery(
      [queryKeys.products, query],
      () => productService.list(accessToken, query),
      {
        keepPreviousData: true, // Enables smoother pagination
      }
    );
  } else {
    return useQuery(
      [queryKeys.products],
      () => categoryService.list(accessToken),
      {
        keepPreviousData: true, // Enables smoother pagination
      }
    );
  }
};

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

interface UpdateProductMutationDataType {
  id: number;
  data: Product;
  accessToken: string;
}
export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, data, accessToken }: UpdateProductMutationDataType) =>
      productService.update(id, data, accessToken),

    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.products);
      },
    }
  );
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, accessToken }: { id: number; accessToken: string }) =>
      productService.delete(id, accessToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.products);
      },
    }
  );
};

export const useDeleteManyProduct = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ ids, accessToken }: { ids: number[]; accessToken: string }) =>
      productService.deleteMany(ids, accessToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.products);
      },
    }
  );
};
