import { cuentasApi } from "../../../../../api/cuentasApi";
import { type PostOcasionalPayload } from "../interfaces/PostOcasionalPayload";
import { type PutOcasionalPayload } from "../interfaces/PutOcasionalPayload";

export const addProveedorOcasional = async (
  postOcasionalPayload: PostOcasionalPayload
): Promise<any> => {
  const response = await cuentasApi.post("/Supplier/Create", {
    ...postOcasionalPayload,
  });
  return response;
};

export const updateProveedorOcasional = async (
  putOcasionalPayload: PutOcasionalPayload
): Promise<any> => {
  const response = await cuentasApi.put(
    `/Supplier/Update/${putOcasionalPayload.id}`,
    {
      ...putOcasionalPayload,
    }
  );
  return response;
};


export const deleteProveedorOcasional = async (
  id:string
): Promise<any> => {
  const response = await cuentasApi.delete(
    `/Supplier/${id}`
  );
  return response;
};
