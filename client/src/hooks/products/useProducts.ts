import { useMutation, useQuery, useQueryClient } from "react-query";
import { queryKeys } from "../../query/constants/queryKeys";
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
            () => productService.list(accessToken),
            {
                keepPreviousData: true, // Enables smoother pagination
            }
        );
    }
};

export const useProduct = (id: number, accessToken: string) =>
    useQuery([queryKeys.product(id)], () =>
        productService.get(id, accessToken)
    );

export const useCreateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation(
        ({ data, accessToken }: { data: FormData; accessToken: string }) =>
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
    data: FormData;
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
        ({ item, accessToken }: { item: Product; accessToken: string }) =>
            productService.delete(item, accessToken),
        {
            onMutate: async ({ item }) => {
                await queryClient.cancelQueries(queryKeys.products);
                const previousProducts = queryClient.getQueriesData(
                    queryKeys.products
                );

                console.log(previousProducts);
                queryClient.setQueriesData(
                    queryKeys.products,
                    (oldProducts: any) => {
                        return {
                            ...oldProducts,
                            data: oldProducts.data.filter(
                                (product: any) => product.id !== item.id
                            ),
                            total: oldProducts.total - 1,
                        };
                    }
                );

                return { previousProducts };
            },

            onError: (err, variables, context) => {
                console.log(err, variables, context?.previousProducts[0][1]);
                queryClient.setQueriesData(
                    queryKeys.products,
                    context?.previousProducts[0][1]
                );
            },
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
