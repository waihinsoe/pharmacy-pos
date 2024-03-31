import axios from "axios";
import { config } from "../../config";
import { ReportDateQuery } from "../../types";

const API_URL = `${config.apiBaseUrl}/inventory/reports`;

const getAxiosConfig = (accessToken: string) => ({
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
  withCredentials: true,
});

export const inventoryReportService = {
  getCategoriesReport: async (accessToken: string, query?: ReportDateQuery) => {
    if (query) {
      const { data } = await axios.get(`${API_URL}/categories`, {
        ...getAxiosConfig(accessToken),
        params: { ...query },
      });
      return data;
    } else {
      const { data } = await axios.get(
        `${API_URL}/categories`,
        getAxiosConfig(accessToken)
      );
      return data;
    }
  },

  getProductsReport: async (accessToken: string, query?: ReportDateQuery) => {
    if (query) {
      const { data } = await axios.get(`${API_URL}/products`, {
        ...getAxiosConfig(accessToken),
        params: { ...query },
      });
      return data;
    } else {
      const { data } = await axios.get(
        `${API_URL}/products`,
        getAxiosConfig(accessToken)
      );
      return data;
    }
  },
};
