import { AxiosError } from "axios";
import { cuentasApi } from "../../api/cuentasApi";
import type { AuthResponse } from "../interfaces/auth.response";

export const loginAction = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    //TODO usar tankstak
    const { data: loginResponse } = await cuentasApi.post<AuthResponse>(
      "/User/Login",
      { mail: email, password }
    );
    const data: AuthResponse = loginResponse;
    console.log(data);

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
