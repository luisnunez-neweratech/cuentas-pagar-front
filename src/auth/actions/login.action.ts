import { AxiosError } from "axios";
import { cuentasApi } from "../../api/cuentasApi";
import type { AuthResponse } from "../interfaces/auth.response";
import { loginResponse } from "../mock/login";

export const loginAction = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    //TODO llamar endpoint para login de usuario
    /*  const { data } = await cuentasApi.post<AuthResponse>('/auth/login', { email, password });
      console.log(data); */

    //mock response
    const data: AuthResponse = loginResponse;

    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.response?.data);
      throw new Error(error.response?.data);
    }

    console.log(error);
    throw new Error("Unable to login");
  }
};
