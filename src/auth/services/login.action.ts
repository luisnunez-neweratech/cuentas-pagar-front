import { cuentasApi } from "../../api/cuentasApi";
import type { AuthResponse } from "../interfaces/auth.response";

interface props {
  email: string;
  password: string;
}

export const loginAction = async ({
  email,
  password,
}: props): Promise<AuthResponse> => {
  const { data: loginResponse } = await cuentasApi.post<AuthResponse>(
    "/User/Login",
    { mail: email, password }
  );
  const data: AuthResponse = loginResponse;

  return data;
};
