import { useEffect } from "react";
import { useNavigate } from "react-router";
import type { ReactNode } from "react";
import { useAuthStore } from "../stores/auth/auth.store";
import { cuentasApi } from "../api/cuentasApi";

const AxiosInterceptorComponent = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const logoutUser = useAuthStore((state) => state.logoutUser);

  useEffect(() => {
    const interceptorId = cuentasApi.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          logoutUser();
        }
        return Promise.reject(error);
      },
    );

    return () => {
      cuentasApi.interceptors.response.eject(interceptorId);
    };
  }, [navigate]);

  return children;
};

export { cuentasApi, AxiosInterceptorComponent };
