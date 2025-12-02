import { cuentasApi } from "../../../../api/cuentasApi";
import type { PostFacturaHeaderPayload } from "../interfaces/PostFacturaHeaderPayload";

export const addFacturaHeader = async (
  postFacturaHeaderPayload: PostFacturaHeaderPayload
): Promise<any> => {
  const response = await cuentasApi.post("/Invoice/HeaderCreate", {
    ...postFacturaHeaderPayload,
  });
  return response;
};
