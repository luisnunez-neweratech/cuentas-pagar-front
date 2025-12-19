import { cuentasApi } from "../../../../api/cuentasApi";
import type { Giro } from "../giros/interfaces/Giro";

export const getAllGiros = async (): Promise<Giro[]> => {
  const { data } = await cuentasApi.get(`/CatalogMaster/GetAll/Giros`);
  const response: Giro[] = data.map((giro: any) => {
    return {
      id: giro.id,
      descripcion: giro.itemName,
      value: giro.itemValue,
    };
  });
  return response;
};

export const getGiro = async (id: string): Promise<Giro> => {
  const { data } = await cuentasApi.get(`/CatalogMaster/${id}`);
  return {
    id: data.id,
    descripcion: data.itemName,
    value: data.itemValue,
  };
};

export const addGiro = async (descripcion: string): Promise<any> => {
  const response = await cuentasApi.post("/CatalogMaster/CreateItem", {
    catalogName: "Giros",
    item: descripcion.toUpperCase(),
    catalogId: 101
  });
  return response;
};

export interface updateProps {
  id: string;
  descripcion: string;
}
export const updateGiro = async ({
  id,
  descripcion,
}: updateProps): Promise<any> => {
  const response = await cuentasApi.put(`/CatalogMaster/UpdateItem`, {
    id: Number(id),
    item: descripcion.toUpperCase(),
  });
  return response;
};

export const deleteGiro = async (id: string): Promise<any> => {
  const response = await cuentasApi.delete(`/CatalogMaster/DeleteItem/${id}`);
  return response;
};
