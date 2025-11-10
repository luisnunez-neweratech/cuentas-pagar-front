import { cuentasApi } from "../../../../../api/cuentasApi";
import type { PostContratoPayload } from "../interfaces/PostContratoPayload";
import type { PostDocumentoProveedor } from "../interfaces/PostDocumentoProveedor.Payload";

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
  const { data } = await cuentasApi.post(`/SupplierProfileDocument/${supplierId}/Upload`, {
    ...postDocumentoProveedor,
  });
  return data;
};