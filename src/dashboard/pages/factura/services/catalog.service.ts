import { cuentasApi } from "../../../../api/cuentasApi";

export const getAllUMedidas = async (): Promise<any> => {
  const { data } = await cuentasApi.get(`/CatalogMaster/GetAll/UofM`);
  const response = data.map((giro: any) => {
    return {
      id: giro.id,
      label: giro.itemName,
      value: giro.itemValue,
    };
  });
  return response;
};