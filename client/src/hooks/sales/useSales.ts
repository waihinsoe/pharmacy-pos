import { useMutation, useQueryClient } from "react-query";
import { saleService } from "../../services/api/saleService";
import { CreateSaleMutationDataType } from "../../types/saleTypes";
import { queryKeys } from "../../query/constants/queryKeys";

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
