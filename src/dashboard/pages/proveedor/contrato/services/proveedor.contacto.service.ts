import { cuentasApi } from "../../../../../api/cuentasApi";
import type { PostContactoPayload } from "./interfaces/PostContacto.Payload";

export const addProveedorContacto = async (
  postContratoPayload: PostContactoPayload
): Promise<any> => {
  const { data } = await cuentasApi.post(`/Contact/Create`, {
    ...postContratoPayload,
  });
  return data;
};

export const updateProveedorContacto = async (
  putContactoPayload: PostContactoPayload
): Promise<any> => {
  const response = await cuentasApi.put(
    `/Contact/${putContactoPayload.id}`,
    {
      ...putContactoPayload,
    }
  );
  return response;
};

export const deleteProveedorContacto = async (id: string): Promise<any> => {
  const response = await cuentasApi.delete(`/Contact/${id}`);
  return response;
};
