import { cuentasApi } from "../../../../api/cuentasApi";

interface importFacturaFilesProps {
  xml: any;
}

export const importFacturaFiles = async ({
  xml
}: importFacturaFilesProps): Promise<any> => {
  const formData = new FormData();
  formData.append("xmlFile", xml);

  const { data } = await cuentasApi.post(`/Invoice/ImportFromXml`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};
