import { cuentasApi } from "../../../../api/cuentasApi";
import type { PostFacturaDetallePayload } from "../interfaces/PostFacturaDetallePayload";
import type { PostFacturaHeaderPayload } from "../interfaces/PostFacturaHeaderPayload";

export const addFacturaHeader = async (
  postFacturaHeaderPayload: PostFacturaHeaderPayload
): Promise<any> => {
  const response = await cuentasApi.post("/Invoice/HeaderCreate", {
    ...postFacturaHeaderPayload,
  });
  return response;
};

interface addFacturaDetalleProps {
  postFacturaDetallePayload: PostFacturaDetallePayload[];
  invoiceId: string;
}

export const addFacturaDetalle = async ({
  postFacturaDetallePayload,
  invoiceId,
}: addFacturaDetalleProps): Promise<any> => {
  const response = await cuentasApi.post(
    `/Invoice/DetailsCreate/${invoiceId}`,
    postFacturaDetallePayload
  );
  return response;
};
