import { cuentasApi } from "@/api/cuentasApi"
import type { AuthResponse } from "../interfaces/auth.response";

export const loginAction = async (email: string, password: string): Promise<AuthResponse> => {
    try {

        //TODO llamar endpoint para login de usuario
        const { data } = await cuentasApi.post<AuthResponse>('/auth/login', {
            email, password
        })

        console.log({ data })

        return data;
    } catch (error) {
        console.log(error)
        throw error;
    }
} 