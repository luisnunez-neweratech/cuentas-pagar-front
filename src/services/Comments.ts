import { cuentasApi } from "../api/cuentasApi";

export const getProveedoresComments = async (id: string): Promise<any> => {
  const { data } = await cuentasApi.get(`/Supplier/${id}/Comments`);
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
