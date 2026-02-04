import { cuentasApi } from "../../../../api/cuentasApi";

interface importFacturaFilesProps {
  xml: any;
}

export const importFacturaFiles = async ({
  xml
}: importFacturaFilesProps): Promise<any> => {
  const formData = new FormData();
  formData.append("xmlFile", xml);

  const { data } = await cuentasApi.post(`/Invoice/ImportFromXml?confirmCreateSupplier=true`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

interface importMultipleFacturaFilesProps {
  xmls: any;
}

export const importMultipleFacturaFiles = async ({
  xmls
}: importMultipleFacturaFilesProps): Promise<any> => {
  const formData = new FormData();
  for (let i = 0; i < xmls.length; i++) {
    formData.append('xmlFiles', xmls[i]);
  }

  const { data } = await cuentasApi.post(`/Invoice/ImportBulkFromXml`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

interface validateFileProps {
  xml: any;
}

export const validateFile = async ({
  xml
}: validateFileProps): Promise<any> => {
  const formData = new FormData();
  formData.append("xmlFile", xml);

  const { data } = await cuentasApi.post(`/Invoice/ValidateSupplierBeforeImport`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};

