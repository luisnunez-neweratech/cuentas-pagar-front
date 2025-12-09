import { cuentasApi } from "../../../../api/cuentasApi";

export const getProveedores = async (): Promise<any> => {
  const { data } = await cuentasApi.get(`/Supplier/GetAll`);

  const basicList = data.map((proveedor: any) => ({
    id: proveedor.id,
    descripcion: proveedor.tradeName,
    tipoEntidadId: proveedor.originId
  }));

  const distProveedores = basicList.reduce((acc: any, obj: any) => {
    if (!acc.some((item: any) => item.descripcion === obj.descripcion)) {
      acc.push(obj);
    }
    return acc;
  }, []);  

  return distProveedores;
};

export const getProveedoresAutoComplete = async (): Promise<any> => {
  const { data } = await cuentasApi.get(`/Supplier/Autocomplete`);

  const basicList = data.map((proveedor: any) => ({
    id: proveedor.id,
    descripcion: proveedor.name,
    tipoEntidadId: proveedor.origin,
    productos: proveedor.products,
    condicionesPagoId: proveedor.paymentTermsId,
  }));

  const distProveedores = basicList.reduce((acc: any, obj: any) => {
    if (!acc.some((item: any) => item.descripcion === obj.descripcion)) {
      acc.push(obj);
    }
    return acc;
  }, []);  

  return distProveedores;
};