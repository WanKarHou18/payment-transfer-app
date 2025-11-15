import axios from "axios";
import { BASE_URL } from "../constants/Config";

const api = {
  fetchAccountInformation: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/balance`);
      console.log("response", response);
      return response?.data;
    } catch (error) {
      console.log("error", error);
      throw error;
    }
  },

  transferAmount: async (payload: any) => {
    try {
      const response = await axios.post(`${BASE_URL}/transactions`, payload);
      return response?.data;
    } catch (error) {
      throw error;
    }
  },
};

export default api;
