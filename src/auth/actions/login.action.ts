import { cuentasApi } from "../../api/cuentasApi";
import type { AuthResponse } from "../interfaces/auth.response";
import { loginResponse } from "../mock/login";

export const loginAction = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    //TODO llamar endpoint para login de usuario
    /* const { data } = await cuentasApi.post<AuthResponse>('/auth/login', {
            email, password
        }) */

    //mock response
    const data: AuthResponse = loginResponse;

    console.log({ data });

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
