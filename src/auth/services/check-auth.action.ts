import { cuentasApi } from "../../api/cuentasApi";
import type { AuthResponse } from "../interfaces/auth.response";

export const checkAuthAction = async (): Promise<AuthResponse> => {

    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    try {
        //TODO llamar endpoint para revisar status del token
        const { data } = await cuentasApi.get<AuthResponse>('/auth/check-status')

        localStorage.setItem('token', data.token)

        return data;
    } catch (error) {
        console.log(error)
        localStorage.removeItem('token');
        throw new Error('Token expired or not valid');
    }

} 