import { cuentasApi } from "../../../../api/cuentasApi";
import { TipoProveedor } from "../../proveedor/interfaces/TipoProveedor";

export const getProveedores = async (): Promise<any> => {
  const { data } = await cuentasApi.get(`/Supplier/GetAll`);
  console.log("data", data);

  const dataMapped = data.map((proveedor: any) => {
    return {
      id: proveedor.id,
      rfc: proveedor.rfc,
      alias: proveedor.tradeName,
      razonSocial: proveedor.legalName,
      fechaAlta: "",
      fechaInicioContrato: "",
      fechaFinContrato: "",
      indicadorCSF:
        proveedor.indicadorCSF.toUpperCase() === "SI" ? true : false,
      indicadorIdRepLegal:
        proveedor.indicadorIdRepLegal.toUpperCase() === "SI" ? true : false,
      indicadorCompDom:
        proveedor.indicadorCompDom.toUpperCase() === "SI" ? true : false,
      indicadorPoderRep:
        proveedor.indicadorPoderRep.toUpperCase() === "SI" ? true : false,
      tipoProveedor:
        proveedor.supplierTypeId === 0
          ? TipoProveedor.Contrato.value
          : TipoProveedor.Ocasional.value,
    };
  });

  return dataMapped;
};
