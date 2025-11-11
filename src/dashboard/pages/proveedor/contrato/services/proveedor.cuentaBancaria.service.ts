import { cuentasApi } from "../../../../../api/cuentasApi";
import type { PostCuentaPayload } from "./interfaces/Postcuenta.Payload";
import type { PostDocumentoProveedor } from "./interfaces/PostDocumentoProveedor.Payload";

interface addProveedorCuentaProps {
  postCuentaPayload: PostCuentaPayload;
  supplierId: string;
  caratulaFile?: any;
}

export const addProveedorCuenta = async ({
  postCuentaPayload,
  supplierId,
}: addProveedorCuentaProps): Promise<any> => {
  const { data } = await cuentasApi.post(
    `/BankDetail/Supplier/${supplierId}/Create`,
    {
      ...postCuentaPayload,
    }
  );
  return data;
};

interface addCaratulaProps {
  id: string;
  caratulaFile: any;
}

export const addProveedorCaratula = async ({
  id,
  caratulaFile,
}: addCaratulaProps): Promise<any> => {
  const formData = new FormData();
  formData.append("file", caratulaFile);

  const { data } = await cuentasApi.post(
    `/BankDetail/${id}/UploadBankStatement`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
};

interface updateProveedorCuentaProps {
  id: string;
  putCuentaPayload: PostCuentaPayload;
}
export const updateProveedorCuenta = async ({
  id,
  putCuentaPayload,
}: updateProveedorCuentaProps): Promise<any> => {
  const response = await cuentasApi.put(`/BankDetail/${id}/Update`, {
    ...putCuentaPayload,
  });
  return response;
};

export const deleteProveedorCuenta = async (id: string): Promise<any> => {
  const response = await cuentasApi.delete(`/BankDetail/${id}`);
  return response;
};
