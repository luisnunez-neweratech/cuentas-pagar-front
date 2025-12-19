import { cuentasApi } from "../../../../api/cuentasApi";
import type { PlazoPago } from "../plazoPago/interface/PlazoPago";

export const getAllPlazoPagos = async (): Promise<PlazoPago[]> => {
  const { data } = await cuentasApi.get(`/CatalogMaster/GetAll/PlazoPago`);
  const response: PlazoPago[] = data.map((moneda: any) => {
    return {
      id: moneda.id,
      descripcion: moneda.itemName,
      value: moneda.itemValue,
    };
  });
  return response;
};

export const getPlazoPago = async (id: string): Promise<PlazoPago> => {
  const { data } = await cuentasApi.get(`/CatalogMaster/${id}`);
  return {
    id: data.id,
    descripcion: data.itemName,
    value: data.itemValue,
  };
};

interface postPlazoPago {
  descripcion: string;
  value?: number | null;
}

export const addPlazoPago = async ({
  descripcion,
  value,
}: postPlazoPago): Promise<any> => {
  let dataSend: {
    catalogName: string;
    item: string;
    catalogId: number;
    itemValue?: number | null;    
  } = {
    catalogName: "PlazoPago",
    item: descripcion,
    catalogId: 103,
  };

  if (value) {
    dataSend.itemValue = value;
  }

  const response = await cuentasApi.post("/CatalogMaster/CreateItem", dataSend);
  return response;
};

export interface updateProps {
  id: string;
  descripcion: string;
  value?: number | null;
}
export const updatePlazoPago = async ({
  id,
  descripcion,
  value,
}: updateProps): Promise<any> => {
  const response = await cuentasApi.put(`/CatalogMaster/UpdateItem`, {
    id: Number(id),
    item: descripcion,
    itemValue: value,
  });
  return response;
};

export const deletePlazoPago = async (id: string): Promise<any> => {
  const response = await cuentasApi.delete(`/CatalogMaster/DeleteItem/${id}`);
  return response;
};
