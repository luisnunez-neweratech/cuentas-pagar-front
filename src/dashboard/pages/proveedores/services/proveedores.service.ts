import { cuentasApi } from "../../../../api/cuentasApi";
import { converDateFormat } from "../../../../lib/dates";
import { TipoProveedor } from "../../proveedor/interfaces/TipoProveedor";

interface getProveedoresProps {
  page: number;
  rowsPerPage: number;
}

export const getProveedores = async ({
  page,
  rowsPerPage,
}: getProveedoresProps): Promise<any> => {
  const { data } = await cuentasApi.get(
    `/Supplier/GetPagedAsync/${page}/${rowsPerPage}`
  );
  console.log("data", data);

  const dataMapped = data.items.map((proveedor: any) => {
    return {
      id: proveedor.id,
      rfc: proveedor.rfc,
      alias: proveedor.tradeName,
      razonSocial: proveedor.legalName,
      fechaAlta: converDateFormat(proveedor.createdAt),
      fechaInicioContrato: converDateFormat(proveedor.contractStartDate),
      fechaFinContrato: converDateFormat(proveedor.contractEndDate),
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

  return {
    pageNumber: data.pageNumber,
    pageSize: data.pageSize,
    totalCount: data.totalCount,
    items: dataMapped,
  };
};
