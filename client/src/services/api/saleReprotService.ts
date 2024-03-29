import axios from "axios";
import { config } from "../../config";
import { PaginationAndSearchQuery } from "../../types";

const API_URL = `${config.apiBaseUrl}/sales/reports`;

const getAxiosConfig = (accessToken: string) => ({
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
  withCredentials: true,
});

export const saleReportService = {
  getDailyReport: async (
    accessToken: string,
    query?: PaginationAndSearchQuery
  ) => {
    if (query) {
      const { data } = await axios.get(`${API_URL}/daily`, {
        ...getAxiosConfig(accessToken),
        params: { ...query },
      });
      return data;
    } else {
      const { data } = await axios.get(
        `${API_URL}/daily`,
        getAxiosConfig(accessToken)
      );
      return data;
    }
  },

  getMonthlyReport: async (
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
};
