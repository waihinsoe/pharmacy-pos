import axios from "axios";
import { config } from "../../config";
import { ReportDateQuery } from "../../types";

const API_URL = `${config.apiBaseUrl}/sales/reports`;

const getAxiosConfig = (accessToken: string) => ({
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
  withCredentials: true,
});

export const saleReportService = {
  getDailyReport: async (accessToken: string, query?: ReportDateQuery) => {
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

  getMonthlyReport: async (accessToken: string, query?: ReportDateQuery) => {
    if (query) {
      const { data } = await axios.get(`${API_URL}/monthly`, {
        ...getAxiosConfig(accessToken),
        params: { ...query },
      });
      return data;
    } else {
      const { data } = await axios.get(
        `${API_URL}/monthly`,
        getAxiosConfig(accessToken)
      );
      return data;
    }
  },

  getYearlyReport: async (accessToken: string, query?: ReportDateQuery) => {
    if (query) {
      const { data } = await axios.get(`${API_URL}/yearly`, {
        ...getAxiosConfig(accessToken),
        params: { ...query },
      });
      return data;
    } else {
      const { data } = await axios.get(
        `${API_URL}/yearly`,
        getAxiosConfig(accessToken)
      );
      return data;
    }
  },
};
