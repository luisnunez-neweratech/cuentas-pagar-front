import { cuentasApi } from "../../../../api/cuentasApi";
import type { Giro } from "../giros/interfaces/Giro";

export const getAllGiros = async (): Promise<Giro[]> => {
  const { data } = await cuentasApi.get(`/SupplierActivity/GetAll`);
  const response: Giro[] = data.map((giro: any) => {
    return {
      id: giro.id,
      descripcion: giro.description,
    };
  });
  return response;
};

export const getGiro = async (id: string): Promise<Giro> => {
  const { data } = await cuentasApi.get(`/SupplierActivity/${id}`);
  return {
    id: data.id,
    descripcion: data.description,
  };
};

export const addGiro = async (descripcion: string): Promise<any> => {
  const response = await cuentasApi.post("/SupplierActivity/CreateActivity", {
    activity: descripcion,
  });
  return response;
};
