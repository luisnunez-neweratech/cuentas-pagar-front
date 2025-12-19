import axios from "axios";

const sgpyonApi = axios.create({
  baseURL: import.meta.env.VITE_API_SGPYON_URL,
});

sgpyonApi.interceptors.request.use((config) => {
  
  config.headers['X-Api-Key'] = `CuentasPorPagar:NewEraTech`;
  
  return config;
});

export { sgpyonApi };
