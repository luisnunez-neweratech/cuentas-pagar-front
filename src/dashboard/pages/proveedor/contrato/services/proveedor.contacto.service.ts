import { cuentasApi } from "../../../../../api/cuentasApi";
import type { PostContactoPayload } from "../interfaces/PostContacto.Payload";

export const addProveedorContacto = async (
  postContratoPayload: PostContactoPayload
): Promise<any> => {
  const { data } = await cuentasApi.post(`/Contact/Create`, {
    ...postContratoPayload,
  });
  return data;
};
