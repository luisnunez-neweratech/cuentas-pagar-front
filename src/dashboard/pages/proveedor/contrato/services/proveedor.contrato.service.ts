import { cuentasApi } from "../../../../../api/cuentasApi";
import { type PostPerfilPayload } from "../interfaces/PostPerfilPayload";
import { type PutContratoPayload } from "../interfaces/PutContratoPayload";

export const addProveedorContrato = async (
  postPerfilPayload: PostPerfilPayload
): Promise<any> => {
  const { data } = await cuentasApi.post("/Supplier/Create", {
    ...postPerfilPayload,
  });
  return data;
};

export const updateProveedorContrato = async (
  putContratoPayload: PutContratoPayload
): Promise<any> => {
  const response = await cuentasApi.put(
    `/Supplier/Update/${putContratoPayload.id}`,
    {
      ...putContratoPayload,
    }
  );
  return response;
};

/*
export const deleteProveedorOcasional = async (id: string): Promise<any> => {
  const response = await cuentasApi.delete(`/Supplier/${id}`);
  return response;
};

export const getProveedorOcasional = async (id: string): Promise<any> => {
  const { data } = await cuentasApi.get(`/Supplier/${id}/Details`);
  console.log("data", data);

  return {
    id: data.id,
    tipoProveedor: data.supplierTypeId,
    tipoEntidad: data.originId,
    tipoPersona: data.legalPersonTypeId,
    razonSocial: data.legalName,
    alias: data.tradeName,
    rfc: data.rfc,
    email: data.email,
    giroPrincipal: data.supplierActivity ? data.supplierActivity.id : null,
    productos: data.productServices.map((producto: any) => producto.id),
  };
};
 */
