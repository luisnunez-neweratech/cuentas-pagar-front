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

export const deleteProveedorOcasional = async (id: string): Promise<any> => {
  const response = await cuentasApi.delete(`/Supplier/${id}`);
  return response;
};

export const activateSupplier = async (id: string): Promise<any> => {
  const response = await cuentasApi.post(`/Supplier/${id}/Activate`);
  return response;
};

export const getProveedorOcasional = async (id: string): Promise<any> => {
  const { data } = await cuentasApi.get(`/Supplier/${id}/Details`);

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
    paymentTermsId: data.paymentTermsId,
    isActive: data.isActive,
  };
};
