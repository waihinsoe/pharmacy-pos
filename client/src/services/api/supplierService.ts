import axios from "axios";
import { config } from "../../config";
import { PaginationAndSearchQuery, Supplier } from "../../types";

const API_URL = `${config.apiBaseUrl}/suppliers`;

const getAxiosConfig = (accessToken: string) => ({
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
  withCredentials: true,
});

export const supplierService = {
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

  create: async (data: Supplier, accessToken: string) => {
    const { data: resData } = await axios.post(
      `${API_URL}`,
      data,
      getAxiosConfig(accessToken)
    );
    return resData;
  },

  update: async (id: number, data: Supplier, accessToken: string) => {
    const { data: resData } = await axios.put(
      `${API_URL}/${id}`,
      data,
      getAxiosConfig(accessToken)
    );
    return resData;
  },

  delete: async (id: number, accessToken: string) => {
    const { data: resData } = await axios.delete(
      `${API_URL}/${id}`,
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
