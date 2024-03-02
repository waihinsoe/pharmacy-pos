import { useMutation, useQuery, useQueryClient } from "react-query";
import { queryKeys } from "../../query/constants/queryKeys";

import { Customer, PaginationAndSearchQuery } from "../../types";
import { customerService } from "../../services/api/customerService";

export const useCustomers = (
  accessToken: string,
  query?: PaginationAndSearchQuery
) => {
  if (query) {
    return useQuery(
      [queryKeys.customers, query],
      () => customerService.list(accessToken, query),
      {
        keepPreviousData: true, // Enables smoother pagination
      }
    );
  } else {
    return useQuery(
      [queryKeys.customers],
      () => customerService.list(accessToken),
      {
        keepPreviousData: true, // Enables smoother pagination
      }
    );
  }
};

export const useCustomer = (id: number, accessToken: string) =>
  useQuery([queryKeys.customer(id)], () =>
    customerService.get(id, accessToken)
  );

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ data, accessToken }: { data: Customer; accessToken: string }) =>
      customerService.create(data, accessToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.customers);
      },
    }
  );
};

interface UpdateCustomerMutationDataType {
  id: number;
  data: Customer;
  accessToken: string;
}
export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, data, accessToken }: UpdateCustomerMutationDataType) =>
      customerService.update(id, data, accessToken),

    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.customers);
      },
    }
  );
};

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, accessToken }: { id: number; accessToken: string }) =>
      customerService.delete(id, accessToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.customers);
      },
    }
  );
};

export const useDeleteManyCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ ids, accessToken }: { ids: number[]; accessToken: string }) =>
      customerService.deleteMany(ids, accessToken),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKeys.customers);
      },
    }
  );
};
