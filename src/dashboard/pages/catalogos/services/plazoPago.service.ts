import { cuentasApi } from "../../../../api/cuentasApi";
import type { PlazoPago } from "../plazoPago/interface/PlazoPago";

export const getAllPlazoPagos = async (): Promise<PlazoPago[]> => {
  const { data } = await cuentasApi.get(`/CatalogMaster/GetAll/PlazoPago`);
  const response: PlazoPago[] = data.map((moneda: any) => {
    return {
      id: moneda.id,
      descripcion: moneda.itemValue,
    };
  });
  return response;
};

export const getPlazoPago = async (id: string): Promise<PlazoPago> => {
  const { data } = await cuentasApi.get(`/CatalogMaster/${id}`);
  return {
    id: data.id,
    descripcion: data.itemValue,
  };
};

export const addPlazoPago = async (descripcion: string): Promise<any> => {
  const response = await cuentasApi.post("/CatalogMaster/CreateItem", {
    catalogName: "PlazoPago",
    item: descripcion,
  });
  return response;
};

export interface updateProps {
  id: string;
  descripcion: string;
}
export const updatePlazoPago = async ({
  id,
  descripcion,
}: updateProps): Promise<any> => {
  const response = await cuentasApi.put(`/CatalogMaster/UpdateItem`, {
    id: Number(id),
    item: descripcion,
  });
  return response;
};

export const deletePlazoPago = async (id: string): Promise<any> => {
  const response = await cuentasApi.delete(`/CatalogMaster/DeleteItem/${id}`);
  return response;
};
