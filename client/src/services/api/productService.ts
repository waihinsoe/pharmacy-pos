import axios from "axios";
import { config } from "../../config";

const API_URL = `${config.apiBaseUrl}/products`;

export const productService = {
  list: () => axios.get(API_URL),
  get: (id: number) => axios.get(`${API_URL}/${id}`),
  create: (data: any) => axios.post(API_URL, data),
  update: (id: number, data: any) => axios.put(`${API_URL}/${id}`, data),
  delete: (id: number) => axios.delete(`${API_URL}/${id}`),
};
