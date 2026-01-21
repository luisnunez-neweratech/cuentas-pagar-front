import axios from "axios";

const cuentasApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  paramsSerializer: {
    indexes: null,
  },
});

cuentasApi.interceptors.request.use((config) => {
  if (localStorage["auth-storage"]) {
    const auth = JSON.parse(localStorage["auth-storage"]);
    config.headers.Authorization = `Bearer ${auth.state.token}`;
  }
  return config;
});

export { cuentasApi };
