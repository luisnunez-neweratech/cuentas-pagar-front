import { cuentasApi } from "../../api/cuentasApi";

interface props {
  email: string;
  token: string;
}

export const verifyToken = async ({ email, token }: props): Promise<any> => {
  const { data } = await cuentasApi.get(
    `/RecoverPasswordToken/GetTokenByMailAndToken/${email}/${token}`
  );
  return data;
};
