import { cuentasApi } from "../../../../api/cuentasApi";

interface importFacturaFilesProps {
  xml: any;
  pdf: any;
}

export const importFacturaFiles = async ({
  xml,
  pdf,
}: importFacturaFilesProps): Promise<any> => {
  const formData = new FormData();
  formData.append("xmlFile", xml);
  formData.append("pdfFile", pdf);

  const { data } = await cuentasApi.post(`/Invoice/ImportFromXml`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};
