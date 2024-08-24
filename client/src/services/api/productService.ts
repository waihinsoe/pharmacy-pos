import axios from "axios";
import { config } from "../../config";
import { PaginationAndSearchQuery, Product } from "../../types";

const API_URL = `${config.apiBaseUrl}/products`;

const getAxiosConfig = (accessToken: string) => ({
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
  withCredentials: true,
});

export const productService = {
  list: async (accessToken: string, query?: PaginationAndSearchQuery) => {
    if (query) {
      const { data } = await axios.get(API_URL, {
        ...getAxiosConfig(accessToken),
        params: { ...query },
      });
      return data;
    } else {
      const { data } = await axios.get(API_URL, getAxiosConfig(accessToken));
      return data;
    }
  },

  get: async (id: number, accessToken: string) => {
    const { data } = await axios.get(
      `${API_URL}/${id}`,
      getAxiosConfig(accessToken)
    );
    return data;
  },

  create: async (data: FormData, accessToken: string) => {
    const { data: resData } = await axios.post(
      `${API_URL}`,
      data,
      getAxiosConfig(accessToken)
    );
    return resData;
  },

  update: async (id: number, data: FormData, accessToken: string) => {
    const { data: resData } = await axios.put(
      `${API_URL}/${id}`,
      data,
      getAxiosConfig(accessToken)
    );
    return resData;
  },

  delete: async (item: Product, accessToken: string) => {
    const { data: resData } = await axios.delete(
      `${API_URL}/${item.id}`,
      getAxiosConfig(accessToken)
    );
    return resData;
  },

  deleteMany: async (ids: number[], accessToken: string) => {
    const { data: resData } = await axios.delete(
      `${API_URL}/deleteMany/${ids}`,
      getAxiosConfig(accessToken)
    );
    return resData;
  },
};
