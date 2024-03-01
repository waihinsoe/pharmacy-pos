import { useMutation, useQuery, useQueryClient } from "react-query";
import { queryKeys } from "../../query/constants/queryKeys";

import { PaginationAndSearchQuery, Supplier } from "../../types";
import { supplierService } from "../../services/api/supplierService";

export const useSuppliers = (
  accessToken: string,
  query?: PaginationAndSearchQuery
) => {
  if (query) {
    return useQuery(
      [queryKeys.suppliers, query],
      () => supplierService.list(accessToken, query),
      {
        keepPreviousData: true, // Enables smoother pagination
      }
    );
  } else {
    return useQuery(
      [queryKeys.suppliers],
      () => supplierService.list(accessToken),
      {
        keepPreviousData: true, // Enables smoother pagination
      }
    );
  }
};

export const useSupplier = (id: number, accessToken: string) =>
  useQuery([queryKeys.supplier(id)], () =>
    supplierService.get(id, accessToken)
  );

export const useCreateSupplier = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ data, accessToken }: { data: Supplier; accessToken: string }) =>
      supplierService.create(data, accessToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.suppliers);
      },
    }
  );
};

interface UpdateSupplierMutationDataType {
  id: number;
  data: Supplier;
  accessToken: string;
}
export const useUpdateSupplier = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, data, accessToken }: UpdateSupplierMutationDataType) =>
      supplierService.update(id, data, accessToken),

    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.suppliers);
      },
    }
  );
};

export const useDeleteSupplier = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, accessToken }: { id: number; accessToken: string }) =>
      supplierService.delete(id, accessToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.suppliers);
      },
    }
  );
};

export const useDeleteManySupplier = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ ids, accessToken }: { ids: number[]; accessToken: string }) =>
      supplierService.deleteMany(ids, accessToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.suppliers);
      },
    }
  );
};
