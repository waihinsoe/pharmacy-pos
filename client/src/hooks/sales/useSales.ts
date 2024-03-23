import { useMutation, useQuery, useQueryClient } from "react-query";
import { saleService } from "../../services/api/saleService";
import { CreateSaleMutationDataType } from "../../types/saleTypes";
import { queryKeys } from "../../query/constants/queryKeys";
import { PaginationAndSearchQuery } from "../../types";

export const useSales = (
  accessToken: string,
  query?: PaginationAndSearchQuery
) => {
  if (query) {
    return useQuery(
      [queryKeys.sales, query],
      () => saleService.list(accessToken, query),
      {
        keepPreviousData: true, // Enables smoother pagination
      }
    );
  } else {
    return useQuery([queryKeys.sales], () => saleService.list(accessToken), {
      keepPreviousData: true, // Enables smoother pagination
    });
  }
};

export const useSaleDetails = (
  id: number,
  accessToken: string,
  query?: PaginationAndSearchQuery
) => {
  if (query) {
    return useQuery(
      [queryKeys.saleDetail(id), query],
      () => saleService.detailListBySaleId(id, accessToken, query),
      {
        keepPreviousData: true, // Enables smoother pagination
      }
    );
  } else {
    return useQuery(
      [queryKeys.saleDetail(id)],
      () => saleService.detailListBySaleId(id, accessToken),
      {
        keepPreviousData: true, // Enables smoother pagination
      }
    );
  }
};

export const useCreateSale = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ data, accessToken }: CreateSaleMutationDataType) =>
      saleService.create(data, accessToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.products);
      },
    }
  );
};
