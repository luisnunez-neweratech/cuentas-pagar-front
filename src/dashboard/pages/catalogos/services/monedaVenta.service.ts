import { cuentasApi } from "../../../../api/cuentasApi";
import type { MonedaVenta } from "../monedaVenta/interface/MonedaVenta";

export const getAllMonedaVentas = async (): Promise<MonedaVenta[]> => {
  const { data } = await cuentasApi.get(`/CatalogMaster/GetAll/Moneda`);
  const response: MonedaVenta[] = data.map((moneda: any) => {
    return {
      id: moneda.id,
      descripcion: moneda.itemName,
      value: moneda.itemValue,
    };
  });
  return response;
};

export const getMonedaVenta = async (id: string): Promise<MonedaVenta> => {
  const { data } = await cuentasApi.get(`/CatalogMaster/${id}`);
  return {
    id: data.id,
    descripcion: data.itemName,
    value: data.itemValue,
  };
};

export const addMonedaVenta = async (descripcion: string): Promise<any> => {
  const response = await cuentasApi.post("/CatalogMaster/CreateItem", {
    catalogName: "Moneda",
    item: descripcion,
    catalogId: 102
  });
  return response;
};

export interface updateProps {
  id: string;
  descripcion: string;
}
export const updateMonedaVenta = async ({
  id,
  descripcion,
}: updateProps): Promise<any> => {
  const response = await cuentasApi.put(`/CatalogMaster/UpdateItem`, {
    id: Number(id),
    item: descripcion,
  });
  return response;
};

export const deleteMonedaVenta = async (id: string): Promise<any> => {
  const response = await cuentasApi.delete(`/CatalogMaster/DeleteItem/${id}`);
  return response;
};
