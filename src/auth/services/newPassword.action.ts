import { cuentasApi } from "../../api/cuentasApi";

interface props {
  email: string;
  password: string;
}

export const newPasswordAction = async ({
  email,
  password,
}: props): Promise<any> => {
  const { data: loginResponse } = await cuentasApi.post(
    "/User/ChangePassword",
    { mail: email, password }
  );
  const data = loginResponse;

  return data;
};
