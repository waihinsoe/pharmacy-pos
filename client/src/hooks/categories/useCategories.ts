import { useMutation, useQuery, useQueryClient } from "react-query";
import { queryKeys } from "../../query/constants/queryKeys";
import { categoryService } from "../../services/api/categoryService";
import { Category } from "../../types/categoryTypes";
import { PaginationAndSearchQuery } from "../../types";

export const useCategories = (
  query: PaginationAndSearchQuery,
  accessToken: string
) =>
  useQuery(
    [queryKeys.categories, query],
    () => categoryService.list(query, accessToken),
    {
      keepPreviousData: true, // Enables smoother pagination
    }
  );

export const useCategory = (id: number, accessToken: string) =>
  useQuery([queryKeys.category(id)], () =>
    categoryService.get(id, accessToken)
  );

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ data, accessToken }: { data: Category; accessToken: string }) =>
      categoryService.create(data, accessToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.categories);
      },
    }
  );
};

interface UpdateCategoryMutationDataType {
  id: number;
  data: Category;
  accessToken: string;
}
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, data, accessToken }: UpdateCategoryMutationDataType) =>
      categoryService.update(id, data, accessToken),

    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.categories);
      },
    }
  );
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, accessToken }: { id: number; accessToken: string }) =>
      categoryService.delete(id, accessToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.categories);
      },
    }
  );
};

export const useDeleteManyCategory = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ ids, accessToken }: { ids: number[]; accessToken: string }) =>
      categoryService.deleteMany(ids, accessToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.categories);
      },
    }
  );
};
