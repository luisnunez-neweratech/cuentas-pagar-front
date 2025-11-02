import { cuentasApi } from "../../api/cuentasApi";

interface props {
  email: string;
}

export const recoverPasswordAction = async ({ email }: props): Promise<any> => {
  const { data: recoverPasswordResponse } = await cuentasApi.post(
    "/RecoverPasswordToken/CreateByMail",
    { mail: email }
  );
  const data = recoverPasswordResponse;
  return data;
};
