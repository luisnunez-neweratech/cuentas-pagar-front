import { cuentasApi } from "../../../../../api/cuentasApi";
import type { PostColaboradorPayload } from "./interfaces/PostColaborador.Payload";
import type { PostContratoPayload } from "./interfaces/PostContratoPayload";
import type { PostDocumentoProveedor } from "./interfaces/PostDocumentoProveedor.Payload";

interface addProveedorContratoProps {
  supplierId: string;
  postContratoPayload: PostContratoPayload;
}

export const addProveedorContrato = async ({
  supplierId,
  postContratoPayload,
}: addProveedorContratoProps): Promise<any> => {
  const { data } = await cuentasApi.post(`/Contract/Supplier/${supplierId}`, {
    ...postContratoPayload,
  });
  return data;
};

interface addProveedorDocumentoProps {
  supplierId: string;
  postDocumentoProveedor: PostDocumentoProveedor;
}

export const addDocumentoProveedor = async ({
  supplierId,
  postDocumentoProveedor,
}: addProveedorDocumentoProps): Promise<any> => {
  const formData = new FormData();
  formData.append("file", postDocumentoProveedor.file);
  formData.append(
    "documentType",
    postDocumentoProveedor.documentType.toString()
  );

  const { data } = await cuentasApi.post(
    `/SupplierProfileDocument/${supplierId}/Upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
};

interface addColaboradoresProveedorProps {
  contractId: string;
  postColaboradorPayload: PostColaboradorPayload;
}

export const addColaboradoresProveedor = async ({
  contractId,
  postColaboradorPayload,
}: addColaboradoresProveedorProps): Promise<any> => {
  const { data } = await cuentasApi.post(
    `/ContractCollaborator/Contract/${contractId}`,
    {
      ...postColaboradorPayload,
    }
  );
  return data;
};

export const getProveedorContrato = async (id: string): Promise<any> => {
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
