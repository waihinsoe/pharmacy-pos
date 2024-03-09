import axios from "axios";
import { config } from "../../config";
import { CreateSaleDataType } from "../../types/saleTypes";

const API_URL = `${config.apiBaseUrl}/sales`;

const getAxiosConfig = (accessToken: string) => ({
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
  withCredentials: true,
});

export const saleService = {
  create: async (data: CreateSaleDataType, accessToken: string) => {
    const { data: resData } = await axios.post(
      `${API_URL}`,
      data,
      getAxiosConfig(accessToken)
    );
    return resData;
  },
};
