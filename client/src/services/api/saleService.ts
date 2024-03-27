import axios from "axios";
import { config } from "../../config";
import { CreateSaleDataType } from "../../types/saleTypes";
import { PaginationAndSearchQuery } from "../../types";

const API_URL = `${config.apiBaseUrl}/sales`;

const getAxiosConfig = (accessToken: string) => ({
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
  withCredentials: true,
});

export const saleService = {
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

  detailListBySaleId: async (
    id: number,
    accessToken: string,
    query?: PaginationAndSearchQuery
  ) => {
    if (query) {
      const { data } = await axios.get(`${API_URL}/${id}/detail`, {
        ...getAxiosConfig(accessToken),
        params: { ...query },
      });
      return data;
    } else {
      const { data } = await axios.get(
        `${API_URL}/${id}/detail`,
        getAxiosConfig(accessToken)
      );
      return data;
    }
  },

  create: async (data: CreateSaleDataType, accessToken: string) => {
    const { data: resData } = await axios.post(
      `${API_URL}`,
      data,
      getAxiosConfig(accessToken)
    );
    return resData;
  },
};
