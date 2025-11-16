import axios from "axios";
import { BASE_URL } from "../constants/Config";

const api = {
  fetchAccountInformation: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/balance`);
      return response?.data;
    } catch (error) {}
  },

  transferAmount: async (payload: any) => {
    try {
      const response = await axios.post(`${BASE_URL}/transactions`, payload);
      return response?.data;
    } catch (error) {}
  },

  topUpBalance: async (payload: any) => {
    try {
      const response = await axios.post(`${BASE_URL}/top-up-balance`, payload);
      return response?.data;
    } catch (error) {}
  },
};

export default api;
