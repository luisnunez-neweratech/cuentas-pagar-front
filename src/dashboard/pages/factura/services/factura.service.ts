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

interface uploadFacturaFilesProps {
  facturaId: string;
  pdf: any;
  xml: any;
}

export const uploadFacturaFiles = async ({
  facturaId,
  pdf,
  xml,
}: uploadFacturaFilesProps): Promise<any> => {
  const formData = new FormData();
  formData.append("xmlFile", xml);
  formData.append("pdfFile", pdf);

  const { data } = await cuentasApi.post(
    `/Invoice/${facturaId}/UploadDocuments`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return data;
};
