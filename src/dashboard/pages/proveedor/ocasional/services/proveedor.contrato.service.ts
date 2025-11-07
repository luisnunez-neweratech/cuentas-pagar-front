import { cuentasApi } from "../../../../../api/cuentasApi";
import { type PostOcasionalPayload } from "../interfaces/PostOcasionalPayload";



export const addProveedorOcasional = async (postOcasionalPayload: PostOcasionalPayload): Promise<any> => {
  const response = await cuentasApi.post("/Supplier/Create", {
    ...postOcasionalPayload
  });
  return response;
};
