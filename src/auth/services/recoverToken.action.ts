import { cuentasApi } from "../../api/cuentasApi";
import type { AuthResponse } from "../interfaces/auth.response";

interface props {
  email: string;
  token: string;
}

export const loginAction = async ({
  email,
  token,
}: props): Promise<AuthResponse> => {
  const { data: loginResponse } = await cuentasApi.get<AuthResponse>(
    `/RecoverPasswordToken/GetTokenByMailAndToken/${email}/${token}`
  );
  const data: AuthResponse = loginResponse;

  return data;
};
