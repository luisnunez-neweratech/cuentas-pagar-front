import { sgpyonApi } from "../../../../api/sgpyonApi";

export const getColaboradoresSgpyon = async (): Promise<any> => {
  const { data } = await sgpyonApi.get(
    `/external/CuentasPorPagar/GetColaboratorsVista/EN`
  );

  return data;
};
