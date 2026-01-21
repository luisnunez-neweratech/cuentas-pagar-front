import axios from "axios";
import { useAuthStore } from "../stores/auth/auth.store";

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

cuentasApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const logoutUser = useAuthStore((state) => state.logoutUser);
    if (error.response.status === 401) {
      logoutUser();
    }
    return error;
  },
);

export { cuentasApi };
