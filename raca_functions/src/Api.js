import axios from "axios";

const api = axios.create({
  baseURL: "https://market-api.radiocaca.com",
});

export default api;