import { cuentasApi } from "../api/cuentasApi";

export const getProveedoresComments = async (id: string): Promise<any> => {
  const { data } = await cuentasApi.get(`/Supplier/${id}/Comments`);
  return data;
};

export const getFacturasComments = async (id: string): Promise<any> => {
  const { data } = await cuentasApi.get(`/Invoice/${id}/Comments`);
  return data;
};

interface postComments {
  supplierId: string;
  commentText: string;
}

export const postProveedorComment = async ({
  supplierId,
  commentText,
}: postComments): Promise<any> => {
  const { data } = await cuentasApi.post(`/Supplier/${supplierId}/Comments`, {
    commentText,
  });
  return data;
};

interface postFacturas {
  supplierId: string;
  commentText: string;
}

export const postFacturaComment = async ({
  supplierId,
  commentText,
}: postFacturas): Promise<any> => {
  const { data } = await cuentasApi.post(`/Invoice/${supplierId}/Comments`, {
    commentText,
  });
  return data;
};
