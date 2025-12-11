import { cuentasApi } from "../../../../api/cuentasApi";
import type { PostFacturaDetallePayload } from "../interfaces/PostFacturaDetallePayload";
import type { PostFacturaHeaderPayload } from "../interfaces/PostFacturaHeaderPayload";
import type { PutFacturaDetallePayload } from "../interfaces/PutFacturaDetallePayload";
import type { PutFacturaHeaderPayload } from "../interfaces/PutFacturaHeaderPayload";

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

export const getFactura = async (id: string): Promise<any> => {
  const { data } = await cuentasApi.get(`/Invoice/${id}/Details`);

  return {
    proveedorId: data.supplierId,
    noFactura: data.invoiceNumber,
    tipoDocumentoId: data.documentType,
    folioFiscal: data.fiscalFolio,
    fechaFactura: data.invoiceDate,
    productos: data.supplierProductService,
    subtotal: data.subtotal,
    descuento: data.discount,
    impuestos: data.taxIVA,
    ivaRetenido: data.taxIVARetained,
    isrRetenido: data.taxISRRetained,
    total: data.total,
    monedaId: data.currencyId,
    fechaProgramadaPago: data.scheduledPaymentDate,
    statusFacturaId: data.invoiceStatusId,
    fechaPago: data.paymentDate,
    fechaReembolso: data.reimbursementDate,
    statusReembolso: data.reimbursementStatus,
    colaboradorId: data.reimbursementCollaboratorId,
    details: data.invoiceDetails,
    xmlName: data.invoiceDocument?.xmlFileName ?? null,
    xmlFile: data.invoiceDocument?.xmlFilePath ?? null,
    pdfName: data.invoiceDocument?.pdfFileName ?? null,
    pdfFile: data.invoiceDocument?.pdfFilePath ?? null,
    condicionesPagoId: data.paymentTermId,
  };
};

interface updateFacturaHeaderProps {
  putFacturaHeaderPayload: PutFacturaHeaderPayload;
  invoiceId: string;
}
export const updateFacturaHeader = async ({
  putFacturaHeaderPayload,
  invoiceId,
}: updateFacturaHeaderProps): Promise<any> => {
  const response = await cuentasApi.put(`/Invoice/HeaderUpdate/${invoiceId}`, {
    ...putFacturaHeaderPayload,
  });
  return response;
};

interface putFacturaDetalleProps {
  putFacturaDetallePayload: PutFacturaDetallePayload[];
  invoiceId: string;
}

export const updateFacturaDetalle = async ({
  putFacturaDetallePayload,
  invoiceId,
}: putFacturaDetalleProps): Promise<any> => {
  const response = await cuentasApi.put(
    `/Invoice/DetailsUpdate/${invoiceId}`,
    putFacturaDetallePayload
  );
  return response;
};

export const getStatusFactura = async (): Promise<any> => {
  const { data } = await cuentasApi.get(`/CatalogMaster/GetAll/InvoiceStatus`);

  return data;
};

interface deleteFacturaArchivoProps {
  invoiceId: string;
  fileType: string;
}

export const deleteFacturaArchivo = async ({
  invoiceId,
  fileType,
}: deleteFacturaArchivoProps): Promise<any> => {
  const { data } = await cuentasApi.delete(
    `/Invoice/${invoiceId}/Document/${fileType}`
  );

  return data;
};

export const getCheckDuplicate = async (
  invoiceNumber: string,
  fiscalFolio: string
): Promise<any> => {
  const { data } = await cuentasApi.get(
    `/Invoice/CheckDuplicate?invoiceNumber=${invoiceNumber}&fiscalFolio=${fiscalFolio}`
  );

  return data;
};
