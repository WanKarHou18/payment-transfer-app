import axios from "axios";

const api = {
  fetchAccountInformation: async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/12`);
      return response?.data;
    } catch (error) {}
  },
};

export default api;
