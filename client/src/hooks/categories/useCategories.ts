import { useMutation, useQuery, useQueryClient } from "react-query";
import { queryKeys } from "../../query/constants/queryKeys";
import { categoryService } from "../../services/api/categoryService";

import { Category, PaginationAndSearchQuery } from "../../types";

export const useCategories = (
  accessToken: string,
  query?: PaginationAndSearchQuery
) => {
  if (query) {
    return useQuery(
      [queryKeys.categories, query],
      () => categoryService.list(accessToken, query),
      {
        keepPreviousData: true, // Enables smoother pagination
      }
    );
  } else {
    return useQuery(
      [queryKeys.categories],
      () => categoryService.list(accessToken),
      {
        keepPreviousData: true, // Enables smoother pagination
      }
    );
  }
};

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
